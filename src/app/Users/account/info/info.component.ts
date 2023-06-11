import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(
    private data_service: ComponentService,
    private admin: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private _router: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }
  changePasswordForm = this.fb.group({
    old_password: ['', Validators.required],
    new_password: ['', Validators.required],
    new_confirm_password: ['', Validators.required]
  });
  showOldPassword: boolean = false;
showNewPassword: boolean = false;
showConfirmPassword: boolean = false;

toggleShowOldPassword() {
  this.showOldPassword = !this.showOldPassword;
}

toggleShowNewPassword() {
  this.showNewPassword = !this.showNewPassword;
}

toggleShowConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}
  onSubmit(): void {
    this.admin.update_password(this.changePasswordForm.value).subscribe( response => {
      // res => console.log(res),
      // err => console.log(err),
      this.toastr.success('Thay đổi mật khẩu thành công!' )
    },
    error => {
      // Xử lý lỗi khi xóa sản phẩm
      this.toastr.error('Đổi mật khẩu thất bại!', );
  }
    );
  }
}
