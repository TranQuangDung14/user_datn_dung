import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
  selector: 'app-product_add',
  templateUrl: './product_add.component.html',
  styleUrls: ['./product_add.component.css']
})
export class Product_addComponent implements OnInit {
  private subscription: Subscription;
  productForm: FormGroup;
  imageFiles: File[] = [];
  category_product :any;
  brand:any;
  constructor(
    private formBuilder: FormBuilder,
    private admin: ApiService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      default_price: ['', Validators.required],
      // price: ['', Validators.required],
      tech_specs: ['',Validators.required],
      category_id: ['',Validators.required],
      brand_id: ['',Validators.required],
      description: [''],
      // image: [null]
    });

    this.get_all_product();
  }


  isInvalidField(fieldName: string) {
    const fieldControl = this.productForm.get(fieldName);
    return fieldControl?.invalid;
  }

  // validate
  getErrorMessage(fieldName: string) {
    const fieldControl = this.productForm.get(fieldName);
    if (fieldName === 'name') {
      if (fieldControl?.hasError('required')) {
        return 'Tên danh mục không được để trống!';
      }
    }
    if (fieldName === 'default_price') {
      if (fieldControl?.hasError('required')) {
        return 'Giá tiền không được phép để trống!';
      }
    }
    // if (fieldName === 'tech_specs') {
    //   if (fieldControl?.hasError('required')) {
    //     return 'Thông số không được phép để trống!';
    //   }
    // }
    if (fieldName === 'category_id') {
      if (fieldControl?.hasError('required')) {
        return 'Danh mục không được phép để trống!';
      }
    }
    if (fieldName === 'brand_id') {
      if (fieldControl?.hasError('required')) {
        return 'Thương hiệu không được phép để trống!';
      }
    }
    return undefined;
    // Các thông báo lỗi khác cho các trường khác
  }

  get_all_product() {
    this.subscription = this.admin.get_all_product()
      .subscribe((data: any) => {
        this.category_product = data.category_product;
        this.brand=data.brand;
      }, error => {
        console.log(error);

      }
      )
  }
  submitted = false;
  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      // alert('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc.');
      this.toastr.error('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc!');
      return;
    }
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('default_price', this.productForm.value.default_price);
    formData.append('tech_specs', this.productForm.value.tech_specs);
    formData.append('category_id', this.productForm.value.category_id);
    formData.append('brand_id', this.productForm.value.brand_id);
    formData.append('description', this.productForm.value.description);

    if (this.imageFiles && this.imageFiles.length > 0) {
      for (let i = 0; i < this.imageFiles.length; i++) {
        formData.append(`image[${i}]`, this.imageFiles[i]);
      }
    }
    // formData.forEach((value, key) => {
    //   console.log(key, value)
    // }),
    this.admin.create_product(formData).subscribe(
      res => {
        this.router.navigate(['/product']);
        this.toastr.success('Thêm mới thành công!', );
        // console.log(res);
        // do something with the response
      },
      error => {
        console.log('loi',error);
        this.toastr.error('Thêm mới thất bại kiểm tra lại!', );
        // do something with the error
      }
    );
  }

  // onFileSelected(event:any) {
  //   if (event.target.files.length > 0) {
  //     for (let i = 0; i < event.target.files.length; i++) {
  //       this.imageFiles.push(event.target.files[i]);
  //     }
  //   }
  // }

  onFileSelected(event:any) {
    if (event.target.files.length > 0) {
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader(); // tạo mới đối tượng FileReader
            const file = event.target.files[i]; // lấy file được chọn
            reader.readAsDataURL(file); // đọc file dưới dạng URL
            reader.onload = () => { // xử lý khi đã đọc xong file
                const result = reader.result as string; // chuyển đổi kết quả đọc file về dạng chuỗi
                // hiển thị ảnh trước khi tải lên
                const previewDiv = document.getElementById('preview')!;
                const image = document.createElement('img');
                image.src = result;
                image.width = 150; // đặt chiều rộng của ảnh
                previewDiv.appendChild(image); // thêm ảnh vào thẻ div có id là 'preview'

                // tạo nút X để xóa ảnh
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = 'X';
                deleteButton.onclick = () => {
                    previewDiv.removeChild(image); // xóa ảnh khỏi thẻ div
                    previewDiv.removeChild(deleteButton); // xóa nút x
                    this.imageFiles.splice(this.imageFiles.indexOf(file), 1); // xóa file khỏi mảng
                };
                previewDiv.appendChild(deleteButton); // thêm nút X vào thẻ div
            };
            this.imageFiles.push(file);
        }
    }
}
}
