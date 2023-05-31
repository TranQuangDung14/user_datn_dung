import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  private subscription: Subscription;
  // Mục khai báo biến
  voucher: any;
  title='Voucher';
  // categoryId :any;
  id: number;
  // isEdit: boolean = true;
  searchText:any;

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

  ngOnInit() {
    this.get_all_voucher();
    this.send_title();
  }
  from_input: FormGroup = new FormGroup({
    // id: new FormControl(),
    discount_percentage: new FormControl('', Validators.required),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
  });

// gửi title đi
send_title() {
  this.data_service.Title_message(this.title);
  // console.log('data',this.data_service.Title_message('Danh111'));
}
get_all_voucher() {
  this.subscription = this.admin.get_all_voucher().subscribe(
    (data: any) => {
      // this.voucher = data.voucher;
      this.voucher = data.voucher.map((voucher: any) => {
        voucher.start_date = this.datePipe.transform(voucher.start_date, ' HH:mm:ss dd-MM-yyyy');
        voucher.end_date = this.datePipe.transform(voucher.end_date, ' HH:mm:ss dd-MM-yyyy');
        return voucher;
      });
      console.log(this.voucher);
    },
    (error) => {
      console.log(error);
    }
  );
}
onCreate() {
  // this.submitted=true;
  this.admin
    .create_voucher(this.from_input.value)
    .subscribe((data) => {
      this.from_input.reset();
      // console.log(data);
      this.get_all_voucher();
      this.toastr.success('Thêm mới thành công!', );

      // window.location.reload();
    },
    (error) => {
      this.toastr.error('Thêm thất bại!');
    });
}
resetForm() {
  this.from_input.reset();
}
onDelete(id: number) {
  this.admin.delete_voucher(id).subscribe((data) => {
    this.get_all_voucher();
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
    this.get_all_voucher();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.get_all_voucher();
  }
}
