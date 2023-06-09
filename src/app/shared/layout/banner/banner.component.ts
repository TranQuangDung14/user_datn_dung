import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(
    private admin: ApiService,
  ) { }

  ngOnInit() {
    this.get_banner();
  }
  banner_5:any;
  banner_6:any;
  banner_7:any;
  banner_8:any;
  banner_9:any;
  get_banner(){
    this.admin.get_banner().subscribe(
      (data: any) => {
        // console.log(data.type_posts);
        this.banner_5 = data.banner_5?.image;
        this.banner_6 = data.banner_6?.image;
        this.banner_7 = data.banner_7?.image;
        this.banner_8 = data.banner_8?.image;
        this.banner_9 = data.banner_9?.image;
        // console.log('ảnh11111', data);
        // this.type_posts = data.type_posts;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
