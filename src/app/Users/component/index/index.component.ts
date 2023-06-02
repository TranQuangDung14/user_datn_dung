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
  ngAfterViewInit() {
    this.loadScripts('assets/js/main.js');
    this.loadScripts('assets/js/slick-custom.js');
  }
  ngOnInit() {
    this.get_index_product();
    this.fetchProducts();
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
}
