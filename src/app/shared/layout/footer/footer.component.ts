import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private admin: ApiService,
  ) { }
category:any;
type_post:any;
store_information:any;
  ngOnInit(): void {
    this.get_all();
    this.get_store_information();
  }
  get_all(){
    this.admin.get_index_product().subscribe((data:any)=>{
      this.category=data.category;
      this.type_post=data.type_post;
  },error =>{
    console.log(error);
  })
  }
  get_store_information(){
    this.admin.get_store_information().subscribe((data:any)=>{
      this.store_information=data.store_information[0];
      console.log(this.store_information)
    })
  }
}
