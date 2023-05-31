import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private subscription: Subscription;
  public form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private admin: ApiService,
        private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  register() {
    this.admin.register(this.form.value).subscribe(
      (data: any) => {
        // console.log('tạo thành công', data);
        this.toastr.success(data.message);
        this.router.navigate(['/login']);
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
