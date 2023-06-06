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
    this.get_cart();
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
          alert(response.message);
          // Xử lý thành công
          // console.log(response.message);
          // alert('Áp dụng voucher thành công!');
          this.toastr.success('Áp dụng voucher thành công!', );
          this.get_cart();
        },
        error => {
          // Xử lý lỗi
          alert('Mã không hợp lệ hoặc đã hết hạn!');
          this.toastr.error('Áp dụng voucher thất bại!', );
          // console.log(error);
        }
      );
  }
  increaseQuantity(item: any) {
    item.quantity++;
    this.updateQuantity(item);
}

decreaseQuantity(item: any) {
    if (item.quantity > 0) { // chỉ giảm nếu số lượng hiện tại lớn hơn 0
        item.quantity--;
        this.updateQuantity(item);
    }
}

updateQuantity(item: any) {
    this.admin.update_quantity_cart(item.id, item.quantity)
    .subscribe(
        response => {
            this.get_cart();

        },
        error => {
            alert('Cập nhật không thành công!');
        }
    );
}

  // updateQuantity(item: any) {
  //   console.log('soluong',item.quantity);
  //   this.admin.update_quantity_cart(item.id, item.quantity)
  //     .subscribe(
  //       response => {
  //         this.get_cart();
  //       },
  //       error => {
  //         alert('Cập nhật k thành công!');
  //       }
  //     );
  // }
  removeProduct(item: any) {
    console.log('id',item)
    this.admin.delete_product_cart(item).subscribe(
        response => {
          this.get_cart();
          this.toastr.success('Xóa sản phẩm thành công!', );
          // location.reload();
            // Xóa sản phẩm khỏi danh sách hiển thị hoặc thực hiện các thao tác cần thiết
        },
        error => {
            // Xử lý lỗi khi xóa sản phẩm
            this.toastr.error('Xóa sản phẩm thất bại!', );
        }
    );
}

}
