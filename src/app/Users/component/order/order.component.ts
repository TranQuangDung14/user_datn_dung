import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent extends BaseComponent implements OnInit,AfterViewInit {

  constructor(injector: Injector,
    private admin: ApiService,
    ) {
    super(injector);
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/main.js');
    this.loadScripts('assets/js/slick-custom.js');
  }
  order: any;
  status: number;
  order_detail: any;
  order_product: any;
  id:number;
  ngOnInit() {
  }
  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'Đang chờ xử lý';
      case 2:
        return 'Đang chuẩn bị hàng';
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
  openModal(id: number): void {
    this.id = id; // lưu lại id vào một biến trong component
  }
  get_order(): void {
    this.admin.get_order_customer(this.status).subscribe(
      (data: any) => {
        this.order = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
// chi tiết đơn hàng
  get_order_id(id: number) {
    this.id = id;
    this.admin.get_order_id(this.id).subscribe(data => {
      this.order_detail = data.data;
      this.order_product = data.data.order_details;
      console.log('ddd', this.order_detail);
    })
  }
  update_status_orders(id: number,status:number) {
    this.id = id;
    this.status=status;
    console.log('status', this.status);
    this.admin.update_order_status(this.id, this.status).subscribe(
      (data) => {
        this.get_order();
        alert('Cập nhật đơn hàng thành công')
        // this.toastr.success('Thay đổi trạng thái đơn hàng thành công!');
      },
      (error) => {
        alert('Cập nhật đơn hàng thất bại')
        console.log('error', error);
        // this.toastr.error('Cập nhật thất bại!');
      }
    );
  }
}
