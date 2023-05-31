import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this.data_service.currentMessage.subscribe(title => {
      this.title = title;
      // console.log('tile',this.title);
    });
  }

}
