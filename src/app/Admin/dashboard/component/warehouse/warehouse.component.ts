import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  private subscription: Subscription;
  title='Kho sản phẩm';
    // id :any;
    id: number;
    // isEdit: boolean = true;
    searchText:any;
    warehouse:any;
    //phân trang
    // POSTS: any;
    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [5, 10, 15, 20];
    //end
  constructor(
    private admin: ApiService,
    private data_service: ComponentService,
    private toastr: ToastrService,
    private router :Router,
    private _router: ActivatedRoute
  ) { }

  warehouse_fromEdit: FormGroup = new FormGroup({
    product_id: new FormControl(),
    amount: new FormControl()
  })
  ngOnInit() {

    this.id = this._router.snapshot.params['id'];
    this.admin.get_warehouse(this.id).subscribe(data => {
      // console.log(data)
      this.warehouse_fromEdit = new FormGroup({
        product_id: new FormControl(data.product_id),
        amount: new FormControl(data.amount),

      });
    })

    this.send_title();
    this.get_all_warehouse();
  }
     // gửi title đi
     send_title() {
      this.data_service.Title_message(this.title);
      // console.log('data',this.data_service.Title_message('Danh111'));
    }

    get_id(id: number)
    {
        //  this.id = this._router.snapshot.params['id'];
        this.id =id;
      this.admin.get_category(id).subscribe(data => {
        // console.log('1',data)
        this.warehouse_fromEdit = new FormGroup({
          // name: new FormControl(data.name,Validators.required),
          // product_supplier_id: new FormControl(data.product_supplier_id),
        });
        // this.isEdit = true; // Xác định là chức năng sửa
      })
    }

    get_all_warehouse(){
      this.subscription = this.admin.get_all_warehouse()
      .subscribe((data:any)=>{
        // console.log(data.warehouse);
        this.warehouse=data.warehouse;
      },error =>{
        this.toastr.error('Hiển thị lỗi!');

      }
      )
    }

    onEdit() {
      this.admin.update_warehouse(this.id, this.warehouse_fromEdit.value).subscribe(data => {
        this.router.navigate(['admin/warehouse']);

      });
    }


    //phân trang
    ontableDataChange(event: any) {
      this.page = event;
      // this.get_all_category_product();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      // this.get_all_category_product();
    }
}
