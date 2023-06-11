import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

declare var $: any;
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends BaseComponent implements OnInit,AfterViewInit  {
  constructor(
    injector: Injector,
    private data_service: ComponentService,
    private admin: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private _router: ActivatedRoute) {
    super(injector);
  }

  ngAfterViewInit() {
    this.loadScripts('assets/js/main.js');
    this.loadScripts('assets/js/slick-custom.js');
  }

  product_related:any;
  id: number = 0;
  product_all:any;
  product_id:any;
  detail_name: any;
  detail_default_price: any;
  detail_price: any;
  detail_img_src: any;
  detail_description: any;
  tech_specs: any;
  quantity: any;
  products:any[]=[];
  imgage_all:any[]=[];
  product_detail: any=[];
  // items:any;
  // product_related:any;
  ngOnInit() {
    this.get_detail();
    this.get_product_related();
  }
  //chi tiết sản phẩm
  get_detail() {
    this.id = this._router.snapshot.params['id'];
    console.log('lấy id này',this.id);
    this.admin.get_detail(this.id).subscribe((data: any) => {
      this.imgage_all=data[0].images
      console.log('nef',data[0].images);
      this.product_detail = data;
      this.product_id=data[0].id
      this.detail_name = data[0].name;
      this.detail_price = data[0].default_price;
      this.detail_img_src = data[0].images[0].image;
      this.detail_description = data[0].description;
      this.tech_specs = data[0].tech_specs;
      this.quantity = data[0].quantity;
      console.log('data,',this.imgage_all);
    })

  }

  // sản phẩm liên quan
  get_product_related(){
    // this.id=id,
    this.admin.get_product(this.id).subscribe(
      (data: any) => {

        this.product_related = data.product_related;
        // this.images=data.images;
        console.log('data--', this.product_related);
      },
      (error) => {
        console.log('data--111',error);
      }
      );
  }
  addProduct() {
    // const product_id = this.id = this._router.snapshot.params['id'];
    // const product_id = this.id = this._router.snapshot.params['id'];
    // console.log('id nè',this.id);
    this.admin.islog.subscribe((isLogged: boolean) => {
      if (!isLogged) {
        window.alert('Bạn cần đăng nhập để sử dụng tính năng này!');
        this.router.navigate(['account']);
        return;
      }

      const quantity = 1;

      if (this.quantity == 0 || this.quantity == null) {
        window.alert('Sản phẩm đã hết hàng');
        return;
      }

      this.admin.create_cart(this.id, quantity).subscribe(
        (data) => {
          console.log('data',data);
            let event = new CustomEvent("addedToCart", { detail: { productName: this.detail_name } });
            window.dispatchEvent(event);
            // window.location.reload();
        },
        (error) => {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng', error);
        }
    );
    });
  }

}

