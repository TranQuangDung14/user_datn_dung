import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  private subscription: Subscription;
  // Mục khai báo biến
  supplier: any;
  title='Nhà cung cấp';
  info_supplier :any;
  id: number;
  searchText:any;

  //phân trang
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  //end

  constructor(
    private admin: ApiService,
    private data_service: ComponentService,
    private toastr: ToastrService,
    private router :Router,
    private _router: ActivatedRoute
  ) { }
  submitted = false;
  // form đối tượng
  info_supplier_from: FormGroup = new FormGroup({
    name : new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    adress: new FormControl('',Validators.required),
    number_phone: new FormControl('',[ Validators.pattern('^[0-9]{10}$')]),
    // sectors: new FormControl('',Validators.required),
  });

  get_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
    this.admin.get_info_supplier(id).subscribe(data => {
      // console.log('1',data)
      this.info_supplier_from = new FormGroup({
        name: new FormControl(data.name,Validators.required),
        email: new FormControl(data.email,Validators.email),
        adress: new FormControl(data.adress,Validators.required),
        number_phone: new FormControl(data.number_phone,[ Validators.pattern('^[0-9]{10}$')]),
        // sectors: new FormControl(data.sectors,Validators.required),
        // product_supplier_id: new FormControl(data.product_supplier_id),
      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }
  isInvalidField(fieldName: string) {
    const fieldControl = this.info_supplier_from.get(fieldName);
    return fieldControl?.invalid;
  }

  // validate
  getErrorMessage(fieldName: string) {
    const fieldControl = this.info_supplier_from.get(fieldName);
    if (fieldName === 'name') {
      if (fieldControl?.hasError('required')) {
        return 'Tên danh mục không được để trống.';
      }
    }
    if (fieldName === 'email') {
      if (fieldControl?.hasError('email')) {
        return 'email không đúng định dạng!';
      }
    }
    if (fieldName === 'adress') {
      if (fieldControl?.hasError('required')) {
        return 'Địa chỉ không được để trống.';
      }
    }
    if (fieldName === 'number_phone') {
      if (fieldControl?.hasError('pattern')) {
        return 'Vui lòng nhập số điện thoại gồm 10 chữ số.';
      }
    }

    return undefined;
    // Các thông báo lỗi khác cho các trường khác
  }

  // danh sách
  getall_info_supplier(){
    this.subscription = this.admin.get_all_info_supplier().subscribe((data:any)=>{
      console.log(data);
      this.info_supplier=data;
    },error =>{
      console.log(error);
    }
    )
}

// main
  ngOnInit() {
    this.send_title();
    this.getall_info_supplier();

    const successMessage = sessionStorage.getItem('successMessage');
    if (successMessage) {
      this.toastr.success(successMessage);
      sessionStorage.removeItem('successMessage'); // Xóa thông báo thành công từ sessionStorage
    }

    const errorMessage = sessionStorage.getItem('errorMessage');
    if (errorMessage) {
      this.toastr.error(errorMessage);
      sessionStorage.removeItem('errorMessage'); // Xóa thông báo thất bại từ sessionStorage
    }
  }


  // resetform
  resetForm() {
    this.info_supplier_from.reset();
  }


  // gửi title đi
  send_title() {
    this.data_service.Title_message(this.title);
  }

  get f(){
    return this.info_supplier_from.controls;
  }
  // submitted = false;
  onCreate(){
    this.submitted = true;
    if (this.info_supplier_from.invalid) {
      // alert('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc.');
      this.toastr.error('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc!');
      return;
    }
    // this.submitted=true;
    this.subscription = this.admin.create_info_supplier(this.info_supplier_from.value).subscribe((data)=>{
      sessionStorage.setItem('successMessage', 'Thêm mới thành công!'); // Lưu thông báo thành công trong sessionStorage
      window.location.reload();
    },
    (error) => {
      sessionStorage.setItem('errorMessage', 'Thêm thất bại!'); // Lưu thông báo thất bại trong sessionStorage
      window.location.reload(); // Reload lại trang
    }
    )
  }


  onEdit() {
    this.submitted = true;
    if (this.info_supplier_from.invalid) {
      // alert('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc.');
      this.toastr.error('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc!');
      return;
    }
    // this.submitted=true;
    this.admin.update_info_supplier(this.id, this.info_supplier_from.value).subscribe(data => {
      this.router.navigate(['/supplier']);
      // this.info_supplier_from.reset();
      // console.log(data);
      // this.getall_info_supplier();
      // this.toastr.success('Cập nhật thành công!', );
      sessionStorage.setItem('successMessage', 'Cập nhật thành công!'); // Lưu thông báo thành công trong sessionStorage
      window.location.reload();

    });
  }

  // xóa
  onDelete(id: number) {
    this.admin.delete_info_supplier(id).subscribe((data) => {
      this.getall_info_supplier();
      this.toastr.success('Xóa thành công!', );
    },
    (error) => {
      this.toastr.error('Xóa thất bại!');
    });
  }

  openModal(id: number): void {
    this.id = id; // lưu lại id vào một biến trong component
    this.title = 'Bạn có chắc chắn muốn xóa?'; // hiển thị thông báo xác nhận
  }
    //phân trang
    ontableDataChange(event: any) {
      this.page = event;
      this.getall_info_supplier();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.getall_info_supplier();
    }
}
