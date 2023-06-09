import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-blog_details',
  templateUrl: './blog_details.component.html',
  styleUrls: ['./blog_details.component.css']
})
export class Blog_detailsComponent extends BaseComponent implements OnInit, AfterViewInit {
  private subscription: Subscription
  constructor(injector: Injector,
    private admin: ApiService, private _router: ActivatedRoute
  ) {
    super(injector);
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/main.js');
    this.loadScripts('assets/js/slick-custom.js');
  }

  ngOnInit() {
    this.get_detail();
    this.get_posts();
    this.get_all();
  }
  id: number;
  blog:any;
  type_posts:any;
  featured_products:any;
  get_detail() {
    this.id = this._router.snapshot.params['id'];
    this.admin.get_detail_posts(this.id).subscribe((data: any) => {
      console.log('data nefff', data.posts[0])
      this.blog= data.posts[0];
    })
  }
// danh mục
  get_posts() {
    this.subscription = this.admin.get_index_posts().subscribe((data: any) => {
      // console.log('post', data.posts);
      console.log('sdasdas',data.type_posts);
      // this.posts = data.posts;
      this.type_posts = data.type_posts;
    }, error => {
      console.log(error);
    })
  }
// sản phẩm
  get_all() {
    this.admin.get_index_product().subscribe((data: any) => {
      // this.type_post = data.type_post;
      this.featured_products=data.featured_products;
      console.log('ang',this.featured_products);
    }, error => {
      console.log(error);
    })
  }
}
