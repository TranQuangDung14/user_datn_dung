import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent extends BaseComponent implements OnInit,AfterViewInit {

  constructor(injector: Injector,
    private admin : ApiService) {
    super(injector);
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/main.js');
    this.loadScripts('assets/js/slick-custom.js');
  }
//   video :any;
//   type_video: any;
//   searchText:any;
//     //phân trang
//   // POSTS: any;
//   page: number = 1;
//   count: number = 0;
//   tableSize: number = 2;
//   tableSizes: any = [2, 10, 15, 20];
//   //end


//   private subscription: Subscription
//   public elementSrc = [];
  ngOnInit() {
//     this.get_video();
//   }){
//     this.subscription = this.admin.get_index_video().subscribe((data:any)=>{
//       console.log('video',data.video);
//       console.log(data.type_video);
//       this.video = data.video;
//       this.type_video = data.type_video;
//   },error =>{
//     console.log(error);
//   })
}


//   //phân trang
//   ontableDataChange(event: any) {
//     this.page = event;
//     this.get_video();
//   }
//   ontableSizeChange(event: any): void {
//     this.tableSize = event.target.value;
//     this.page = 1;
//     this.get_video();
//   }
}
