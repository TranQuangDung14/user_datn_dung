import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  private subscription: Subscription;
  // Mục khai báo biến
  title = 'Banner';
  // categoryId :any;
  id: number;
  selectedFile: File;
  // isEdit: boolean = true;
  searchText: any;
  previewUrl: any;
  banner: any;
  imagePreview: string | ArrayBuffer | null;
  bannerId: number | null;
  //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  //end
  constructor(
    private admin: ApiService,
    private data_service: ComponentService,
    private toastr: ToastrService,
    private router: Router,
    private _router: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.bannerId = null;
    this.imagePreview = null;
  }
  ngOnInit() {
    this.send_title();
    this.get_all_banner();
  }
  // gửi title đi
  send_title() {
    this.data_service.Title_message(this.title);
    // console.log('data',this.data_service.Title_message('Danh111'));
  }

  form: FormGroup = new FormGroup({
    // id: new FormControl(),
    ordinal: new FormControl(''),
  });

  getbannerText(ordinal: number): string {
    switch (ordinal) {
      case 1:
        return 'slider chính';
      case 2:
        return 'slider qc trái';
      case 3:
        return 'slider qc phải';
      case 4:
        return 'logo';
      default:
        return '';
    }
  }

  //all
  get_all_banner() {
    this.admin.get_banner().subscribe(
      (data: any) => {
        // this.user =data.user();
        this.banner = data.banner;
        // this.type_post = data.type_post;
        console.log('post', this.banner);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onFileChange(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.form.patchValue({ image: file });
      // this.from_post.value.image.updateValueAndValidity();
      this.selectedFile = event.target.files[0];
      // Read the file and update previewUrl
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  // thêm mới
  onCreate() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('ordinal', this.form.value.ordinal);
      // formData.append('content', this.from_post.get('content').value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }
      this.admin.create_banner(formData).subscribe(
        (data) => {
          // this.from_post.reset();
          this.get_all_banner();
          this.resetForm();
          // this.get_all_post();
          this.toastr.success('Thêm mới thành công!');
        },
        (error) => {
          this.toastr.error('Thêm thất bại!');
        }
      );
    }
  }

  get_banner_id(id: number) {
    this.admin.get_banner_id(id).subscribe(data => {
      this.bannerId = data.id;
      this.form.patchValue({
        ordinal: data.ordinal,
        image: ''
      });
      this.imagePreview = 'http://127.0.0.1:8000/storage/' + data.image;
    });
  }

  onUpdate() {
    if (!this.bannerId) {
      // Handle error
      return;
    }

    const formData = new FormData();
    formData.append('image', this.form.get('image')?.value);
    formData.append('ordinal', this.form.get('ordinal')?.value);

    this.admin.update_banner(this.bannerId, formData).subscribe(response => {
      // console.log(response);
      this.get_all_banner();
      this.toastr.success('Cập nhật thành công!', );
      this.resetForm();
    },
    (error) => {
      this.toastr.error('Cập nhật thất bại!');
    });
  }

  resetForm() {
    this.form.reset();
    this.imagePreview = null;
    this.bannerId = null;
  }

  //phân trang
  ontableDataChange(event: any) {
    this.page = event;
    // this.get_all_voucher();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.get_all_voucher();
  }
}
