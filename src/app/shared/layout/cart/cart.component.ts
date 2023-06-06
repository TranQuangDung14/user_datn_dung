import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private admin: ApiService,
    private toastr: ToastrService,
  ) { }

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
      console.log('data giỏ hàng',this.datacart);
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

  updateQuantity(item: any) {
    console.log('soluong',item.quantity);
    this.admin.update_quantity_cart(item.id, item.quantity)
      .subscribe(
        response => {
          // Hiển thị thông báo thành công bằng alert hoặc thông báo khác
          // console.log(response.message);

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
