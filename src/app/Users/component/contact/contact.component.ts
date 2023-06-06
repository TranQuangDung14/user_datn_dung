import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends BaseComponent implements OnInit,AfterViewInit {

  constructor(injector: Injector,
    private admin: ApiService,
    private toastr: ToastrService,
    ) {
    super(injector);
  }
  store_information:any;
  ngAfterViewInit() {
    this.loadScripts('assets/js/main.js');
    this.loadScripts('assets/js/map-custom.js');
    this.loadScripts('assets/js/slick-custom.js');
  }

  ngOnInit() {
    this.get_store_information();
  }
  get_store_information(){
    this.admin.get_store_information().subscribe((data:any)=>{
      this.store_information=data.store_information[0];
      console.log(this.store_information)
    })
  }
  onSubmit(){
    this.toastr.success('Gửi mail thành công!');
    alert('gửi thành công!');
    window.location.reload(); // Reload lại trang
  }
}
