import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent extends BaseComponent implements OnInit,AfterViewInit {

  constructor(injector: Injector) {
    super(injector);
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/main.js');
    this.loadScripts('assets/js/slick-custom.js');
  }

  ngOnInit() {
  }

}
