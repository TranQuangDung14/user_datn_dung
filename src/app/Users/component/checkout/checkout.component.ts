import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends BaseComponent implements OnInit,AfterViewInit {

  constructor(injector: Injector,
    private admin: ApiService,
    private toastr: ToastrService,
    private router :Router
    ) {
    super(injector);
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/main.js');
    this.loadScripts('assets/js/slick-custom.js');
  }
  totall: any;
  items: any = [];
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;
  submitted = false;
  ngOnInit() {
    // this.items = this.cartService.getItems();
    this.get_cart();
    this.loadProvinces();
    // this.getErrorMessage(fieldName: string);
  }

  loadProvinces() {
    this.admin.getProvinces().subscribe((data: any) => {
      this.provinces = data;
      console.log('tỉnh',this.provinces)
    });
  }

  loadDistricts(provinceId: number) {
    console.log('provinceId',provinceId)
    this.admin.getDistricts(provinceId).subscribe((data: any) => {
      this.districts = data;
      console.log('districts',this.districts);
    });
  }

  loadWards(districtId: number) {
    this.admin.getWards(districtId).subscribe((data: any) => {
      this.wards = data;
    });
  }
  // onChangeProvince(value: any) {
  //   console.log('Selected province', value);
  //   this.selectedProvince = value;
  //   this.loadDistricts(this.selectedProvince);
  // }
  order_fromCreate: FormGroup = new FormGroup({
    payment_method : new FormControl(),
    shipping_fee : new FormControl(),
    receiver_name : new FormControl('', Validators.required),
    number_phone : new FormControl('',[ Validators.required, Validators.pattern('^[0-9]{10}$')]),
    receiver_address : new FormControl('', Validators.required),
    provinces_id : new FormControl(),
    districts_id : new FormControl(),
    ward_id : new FormControl(),
  });
  isInvalidField(fieldName: string) {
    const fieldControl = this.order_fromCreate.get(fieldName);
    return fieldControl?.invalid;
  }

  // validate
  getErrorMessage(fieldName: string) {
    const fieldControl = this.order_fromCreate.get(fieldName);
    if (fieldName === 'receiver_name') {
      if (fieldControl?.hasError('required')) {
        return 'Tên khách hàng không được để trống.';
      }
    }

    if (fieldName === 'number_phone') {
      if (fieldControl?.hasError('required')) {
        return 'Số điện thoại không được để trống.';
      }
      if (fieldControl?.hasError('pattern')) {
        return 'Vui lòng nhập số điện thoại gồm 10 chữ số.';
      }
    }

    if (fieldName === 'receiver_address') {
      if (fieldControl?.hasError('required')) {
        return 'Địa chỉ không được phép để trống.';
      }
    }
    return undefined;
    // Các thông báo lỗi khác cho các trường khác
  }
  onCreate() {
    this.submitted = true;  // Thiết lập submitted là true khi form được gửi

    if (this.order_fromCreate.invalid) {
      alert('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc.');
      return;
    }
    this.selectedProvince = this.order_fromCreate.value.provinces_id;
    this.selectedDistrict = this.order_fromCreate.value.districts_id;
    this.selectedWard = this.order_fromCreate.value.ward_id;

    const orderData = {
      ...this.order_fromCreate.value,
      ward_id: this.selectedWard,
      districts_id: this.selectedDistrict,
      provinces_id: this.selectedProvince
    };
    console.log("nêne",this.order_fromCreate.value)
    this.admin.create_order(orderData).subscribe((data: any) => {
        console.log('success', data)
        alert('Cảm ơn Khách hàng: '+this.order_fromCreate.value.receiver_name+' đã tạo đơn hàng!')
        localStorage.removeItem('cart_items');
        this.router.navigate(['/']);
    }
    )
  }
  datacart:any;
  product_carts:any;
  get_cart(){
    // this.admin.get_all_product() .subscribe((data: any)
    this.admin.getallcart().subscribe((data:any)=>{
      this.datacart=data;
      this.product_carts=data.cart_details

      console.log(  'data giỏ hàng',this.datacart);
    })
  };
}
