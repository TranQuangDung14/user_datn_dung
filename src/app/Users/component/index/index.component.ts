import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit,AfterViewInit {

  constructor(
    injector: Injector,
    private data_service: ComponentService,
    private admin: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private _router: ActivatedRoute
    ) {
    super(injector);
  }
  searchText:any;
  category:any;
  brand:any;
  products = [];
  min_price: number;
  max_price: number;
  category_id: any;
  brand_id: number;
      //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 12;
  tableSizes: any = [5, 10, 15, 20];
  ngAfterViewInit() {
    this.loadScripts('assets/js/main.js');
    this.loadScripts('assets/js/slick-custom.js');
  }
  ngOnInit() {
    this.get_index_product();
    this.fetchProducts();
    this.get_banner();

  }
  // đưa id đi
  viewDetails(product: any) {
    this.data_service.setData(product.id);
  }
  banner_1:any;
  banner_2:any;
  banner_3:any;
  banner_4:any;
  get_banner(){
    this.admin.get_banner().subscribe(
      (data: any) => {
        // console.log(data.type_posts);
        this.banner_1 = data.banner_1?.image;
        this.banner_2 = data.banner_2?.image;
        this.banner_3 = data.banner_3?.image;
        this.banner_4 = data.banner_4?.image;
        // console.log('ảnh11111', data.banner.image);
        // this.type_posts = data.type_posts;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get_index_product() {
   this.admin.get_index_product().subscribe(
      (data: any) => {
        this.category=data.category;
        this.brand=data.brand;
        // console.log('lele',this.category)
      })
    }
    fetchProducts() {
      this.admin.get_filter_products(this.category_id, this.min_price, this.max_price, this.brand_id).subscribe(data => {
        this.products = data;
        console.log('adad',this.products)
      }, error => {
        console.error('Error:', error);
      });
    }

    onFilterChange(minPrice: number, maxPrice: number) {
      this.min_price = minPrice;
      this.max_price = maxPrice;
      this.fetchProducts();
    }
      //phân trang
  ontableDataChange(event: any) {
    this.page = event;
    // this.get_all_voucher();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.get_all_voucher();
  }
}
