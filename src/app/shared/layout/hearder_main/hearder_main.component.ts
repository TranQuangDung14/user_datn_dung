import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-hearder_main',
  templateUrl: './hearder_main.component.html',
  styleUrls: ['./hearder_main.component.css']
})
export class Hearder_mainComponent implements OnInit {

  title: any;

  constructor(
    private data_service: ComponentService,
    private admin: ApiService,
    private router: Router,

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
  search: string = '';

onSubmit() {
  this.router.navigate(['/cua-hang'], { queryParams: { search: this.search } });
}
}
