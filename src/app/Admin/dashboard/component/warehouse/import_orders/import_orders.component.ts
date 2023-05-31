import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-import_orders',
  templateUrl: './import_orders.component.html',
  styleUrls: ['./import_orders.component.css']
})
export class Import_ordersComponent implements OnInit {
  // Mục khai báo biến
  import_order: any;
  title='Nhập kho sản phẩm';
  product:any;
  supplier:any;
  // categoryId :any;
  id: number;
  // isEdit: boolean = true;
  searchText:any;
  // voucher :any;
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
    private router :Router,
    private _router: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  import_order_from: FormGroup = new FormGroup({
    // id: new FormControl(),
    product_id: new FormControl('', Validators.required),
    supplier_id: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  isInvalidField(fieldName: string) {
    const fieldControl = this.import_order_from.get(fieldName);
    return fieldControl?.invalid;
  }

  // validate
  getErrorMessage(fieldName: string) {
    const fieldControl = this.import_order_from.get(fieldName);
    if (fieldName === 'supplier_id') {
      if (fieldControl?.hasError('required')) {
        return 'Nhà cung cấp chưa chọn.';
      }
    }
    if (fieldName === 'product_id') {
      if (fieldControl?.hasError('required')) {
        return 'Sản phẩm chưa chọn.';
      }
    }
    if (fieldName === 'quantity') {
      if (fieldControl?.hasError('required')) {
        return 'Số lượng không được để trống.';
      }
    }
    if (fieldName === 'price') {
      if (fieldControl?.hasError('required')) {
        return 'Giá nhập không được để trống.';
      }
    }

    return undefined;
    // Các thông báo lỗi khác cho các trường khác
  }

  ngOnInit() {
    this.send_title();
    this.get_all_import_order();
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
  // gửi title đi
  send_title() {
    this.data_service.Title_message(this.title);
    // console.log('data',this.data_service.Title_message('Danh111'));
  }

  get_all_import_order() {
    this.admin.get_all_import_orders().subscribe(
      (data: any) => {
        this.import_order = data.import_order.map((import_order: any) => {
          import_order.updated_at = this.datePipe.transform(import_order.updated_at, 'HH:mm:ss dd-MM-yyyy');
          // voucher.end_date = this.datePipe.transform(voucher.end_date, ' HH:mm:ss dd-MM-yyyy');
          return import_order;
        });
        // this.import_order = data.import_order;
        this.product = data.product;
        this.supplier = data.supplier;
        console.log('data',data)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  submitted = false;
  onCreate() {
   // this.submitted=true;
   this.submitted = true;
   if (this.import_order_from.invalid) {
     // alert('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc.');
     this.toastr.error('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc!');
     return;
   }
    this.admin.create_import_order(this.import_order_from.value).subscribe((data) => {
      sessionStorage.setItem('successMessage', 'Thêm mới thành công!'); // Lưu thông báo thành công trong sessionStorage
      window.location.reload(); // Reload lại trang

        // window.location.reload();
      },
      (error) => {
        sessionStorage.setItem('errorMessage', 'Thêm thất bại!'); // Lưu thông báo thất bại trong sessionStorage
        window.location.reload(); // Reload lại trang
      });
  }
  resetForm() {
    this.import_order_from.reset();
  }



  get_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
    this.admin.get_import_order(id).subscribe(data => {
      console.log('1',data.import_order.product_id)

      this.import_order_from = new FormGroup({
        product_id: new FormControl(data.import_order.product_id, Validators.required),
        supplier_id: new FormControl(data.import_order.supplier_id, Validators.required),
        quantity: new FormControl(data.import_order.quantity, Validators.required),
        price: new FormControl(data.import_order.price, Validators.required),
      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }

  onEdit() {
    this.submitted = true;
    if (this.import_order_from.invalid) {
      // alert('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc.');
      this.toastr.error('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc!');
      return;
    }
    this.admin.update_import_order(this.id, this.import_order_from.value).subscribe(data => {
      sessionStorage.setItem('successMessage', 'Cập nhật thành công!'); // Lưu thông báo thành công trong sessionStorage
      window.location.reload(); // Reload lại trang
    },
    (error) => {
      sessionStorage.setItem('errorMessage', 'Cập nhật thất bại!'); // Lưu thông báo thất bại trong sessionStorage
      window.location.reload(); // Reload lại trang
    });
  }


  onDelete(id: number) {
    this.admin.delete_import_order(id).subscribe((data) => {
      this.get_all_import_order();
      this.toastr.success('Xóa thành công!', );
    },
    (error) => {
      console.log('lỗi xóa',error)
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
      this.get_all_import_order();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.get_all_import_order();
    }
}
