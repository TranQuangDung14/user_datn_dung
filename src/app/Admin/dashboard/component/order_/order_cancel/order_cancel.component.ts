import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-order_cancel',
  templateUrl: './order_cancel.component.html',
  styleUrls: ['./order_cancel.component.css'],
})
export class Order_cancelComponent implements OnInit {

 // Mục khai báo biến
 order: any;
 product: any;
 customer: any;

 title = 'Quản lý đơn hàng hủy';
 categoryId: any;
 id: number;
 // isEdit: boolean = true;
 searchText: any;

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
   private _router: ActivatedRoute
 ) {}

 ngOnInit() {
  this.getall_order();
  this.send_title();
 }
 // gửi title đi
 send_title() {
   this.data_service.Title_message(this.title);
 }
 getStatusText(status: number): string {
  switch (status) {
    case 1:
      return 'Đang chờ xử lý';
    case 2:
      return 'Đã xác nhận đơn hàng';
    case 3:
      return 'Đã xuất hàng - đang giao';
    case 4:
      return 'Hoàn thành';
    case 5:
      return 'Hủy đơn';
    default:
      return '';
  }
}


getall_order() {
   this.admin.get_order_cancel()
    .subscribe((data: any) => {
      console.log('order11',data);
      this.order = data;
      // console.log('non',this.id)

    }, error => {
      this.toastr.error('Hiển thị lỗi!');

    }
    )
}

getStatusStyle(status: number): any {
  let background = '';
  let color = '';

  switch (status) {
    case 1:
      // background = 'SandyBrown';
      background = 'lightgrey';
      color = 'black';
      // background = 'lightblue';
      // color = 'black';
      break;
    case 2:
      background = 'rgb(255 250 205)';
      // background = 'lightgreen';
      color = 'black';
      break;
    case 3:
      background = 'rgb(178 223 238)';
      // background = 'lightyellow';
      color = 'black';
      break;
    case 4:
      background = 'lightgreen';
      // background = 'lightgrey';
      color = 'black';
      break;
    case 5:
      background = 'lightcoral';
      color = 'white';
      break;
    default:
      break;
  }

  return { 'background-color': background, color: color };
}



status:number;
// id: number;
// cập nhật trạng thái
update_status_orders(id: number,status:number) {
  this.id = id;
  this.status=status;
  console.log('status', this.status);
  this.admin.update_order_status(this.id, this.status).subscribe(
    (data) => {
      this.getall_order();
      this.toastr.success('Phục đơn hàng thành công!');
    },
    (error) => {
      console.log('error', error);
      this.toastr.error('Cập nhật thất bại!');
    }
  );
}
openModal(id: number): void {
  this.id = id; // lưu lại id vào một biến trong component
}
order_detail:any;
order_product:any;
get_order_id(id:number){
  this.id =id;
  this.admin.get_order_id(this.id).subscribe(data=>{
    this.order_detail=data.data;
    this.order_product=data.data.order_details;
    console.log('ddd',this.order_product);
  })
}

 //phân trang
 ontableDataChange(event: any) {
   this.page = event;
   // this.getall_order();
 }
 ontableSizeChange(event: any): void {
   this.tableSize = event.target.value;
   this.page = 1;
   // this.getall_order();
 }
}
