import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(
    injector: Injector,
    private admin: ApiService,) {
    super(injector);
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/main.js');
    this.loadScripts('assets/js/slick-custom.js');
  }

  posts: any;
  type_posts: any;
  searchText: any;
  type_post: any;
  featured_products:any;
  //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [5, 10, 15, 20];
  //end

  // constructor(private admin : AdminService) { }
  private subscription: Subscription
  // public elementSrc = [];
  ngOnInit() {
    this.get_posts();
    this.get_all();
  }


  get_posts() {
    this.subscription = this.admin.get_index_posts().subscribe((data: any) => {
      console.log('post', data.posts);
      console.log(data.type_posts);
      this.posts = data.posts;
      this.type_posts = data.type_posts;
    }, error => {
      console.log(error);
    })
  }
  get_all() {
    this.admin.get_index_product().subscribe((data: any) => {
      this.type_post = data.type_post;
      this.featured_products=data.featured_products;
      console.log('ang',this.featured_products[0].images[0].image);
    }, error => {
      console.log(error);
    })
  }

  //phân trang
  ontableDataChange(event: any) {
    this.page = event;
    this.get_posts();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.get_posts();
  }

}
