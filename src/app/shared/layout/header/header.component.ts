import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from '../../../core/services/component.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: any;

  constructor(
    private data_service: ComponentService,
    private admin: ApiService,
  ) { }

  ngOnInit(): void {
    this.data_service.currentMessage.subscribe(title => {
      this.title = title;
      // console.log('tile',this.title);
    });
    this.get_banner();
  }

  banner_4:any;
  get_banner(){
    this.admin.get_banner().subscribe(
      (data: any) => {

        this.banner_4 = data.banner_4?.image;
        // console.log('ảnh11111', data.banner.image);
        // this.type_posts = data.type_posts;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
