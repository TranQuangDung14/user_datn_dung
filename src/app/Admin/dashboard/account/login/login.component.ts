import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });
  errorMessage: string = '';
  constructor(
    private admin: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  // constructor(private admin :ApiService , private router: Router) { }

  ngOnInit() {}

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
        this.router.navigate(['/dashboard']).then(() => {
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
}
