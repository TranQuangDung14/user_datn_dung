import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent extends BaseComponent implements OnInit,AfterViewInit {

  constructor(injector: Injector,
    private admin: ApiService,
    private toastr: ToastrService,
    ) {
    super(injector);
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/main.js');
    this.loadScripts('assets/js/slick-custom.js');
  }

  ngOnInit() {
  }
  info_product:any;
  datacart:any;
  voucherCode:any;
  get_cart(){
    // this.admin.get_all_product() .subscribe((data: any)
    this.admin.getallcart().subscribe((data:any)=>{
      this.datacart=data;
      this.info_product=data.cart_details
      console.log(  'data giỏ hàng',this.info_product);
    })
  };

  applyCoupon() {
    this.admin.apply_voucher(this.voucherCode)
      .subscribe(
        response => {
          // alert(response.message);
;         this.toastr.success(response.message, 'Tốt');
          this.get_cart();
        },
        error => {
          // Xử lý lỗi
          alert('Mã không hợp lệ hoặc đã hết hạn!');
          // console.log(error);
        }
      );
  }

  updateQuantity(item: any) {
    console.log('soluong',item.quantity);
    this.admin.update_quantity_cart(item.id, item.quantity)
      .subscribe(
        response => {
          // Hiển thị thông báo thành công bằng alert hoặc thông báo khác
          // console.log(response.message);
          // this.toastr.success('Cập nhật sô!', 'Tốt');
          // alert(response.message);
          this.get_cart();
        },
        error => {
          // Hiển thị thông báo lỗi bằng alert hoặc thông báo khác
          // console.log(error);
          alert('Cập nhật k thành công!');

        }
      );
  }
  removeProduct(item: any) {
    console.log('id',item)
    this.admin.delete_product_cart(item).subscribe(
        response => {
          this.get_cart();
          // location.reload();
            // Xóa sản phẩm khỏi danh sách hiển thị hoặc thực hiện các thao tác cần thiết
            this.toastr.success('Xóa sản phẩm thành công!', 'Tốt');
        },
        error => {
            // Xử lý lỗi khi xóa sản phẩm
            this.toastr.error('Xóa sản phẩm thất bại!');
        }
    );
}

}
