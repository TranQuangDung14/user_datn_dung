import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../../../../../core/services/component.service';

@Component({
  selector: 'app-warehouse_update',
  templateUrl: './warehouse_update.component.html',
  styleUrls: ['./warehouse_update.component.css']
})
export class Warehouse_updateComponent implements OnInit {
  title='Cập nhật kho sản phẩm';
  constructor(
    private data_service: ComponentService,
  ) { }

  ngOnInit() {
    this.send_title();
  }
     // gửi title đi
     send_title() {
      this.data_service.Title_message(this.title);
      // console.log('data',this.data_service.Title_message('Danh111'));
    }
}
