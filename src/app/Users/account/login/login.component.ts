import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit,AfterViewInit {

  constructor(
    injector: Injector,
    private admin: ApiService,
    private router: Router,
    private toastr: ToastrService
    ) {
    super(injector);
  }
  ngAfterViewInit() {
    // this.loadScripts('assets/js/main.js');
    // this.loadScripts('assets/js/slick-custom.js');
    this.loadScripts('assets/js/accout.js');
  }
  public form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });
  public form_register = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  errorMessage: string = '';
  ngOnInit() {
  }
  loginProces() {
    //kiểm tra đầu vào của dữ liệu
    if (this.form.invalid) {
      const emailControl = this.form.get('email');
      if (emailControl && emailControl.hasError('email')) {
        this.toastr.error('Email không hợp lệ', 'Sai email kìa!');
      } else {
        this.toastr.error('Vui lòng nhập đầy đủ thông tin', 'Lỗi');
      }
      return;
    }

    this.admin.login(this.form.value).subscribe(
      (data) => {
        this.toastr.success('Đăng nhập thành công!', 'Tốt');
        this.router.navigate(['/']).then(() => {
          // đăng nhập xong load lại trang
          window.location.reload();
        });
      },
      (error) => {
        this.toastr.error('Thông tin tài khoản & mật khẩu chưa đúng!');
        // const errorMessage = error.error.message[0];
        // this.toastr.error(errorMessage, '!!');
      }
    );
  }
  register() {
    this.admin.register(this.form_register.value).subscribe(
      (data: any) => {
        // console.log('tạo thành công', data);
        this.toastr.success(data.message);
        // this.router.navigate(['/login']);
        window.location.reload();
      },
      (error) => {
        if (error.status === 422) {
          if (error.error.message.email && error.error.message.email[0] === 'Địa chỉ email đã được sử dụng, vui lòng nhập địa chỉ email khác') {
            this.toastr.error('Địa chỉ email đã được sử dụng, vui lòng nhập địa chỉ email khác');
          } else if (error.error.message.password && error.error.message.password[0] === 'The password field is required.') {
            this.toastr.error('Vui lòng nhập mật khẩu!');
          } else {
            this.toastr.error('Tạo tài khoản thất bại!');
          }
        } else {
          this.toastr.error('Lỗi server, vui lòng thử lại sau!','api chưa chạy');
        }
      }
    );
  }
}
