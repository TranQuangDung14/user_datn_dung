import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  templateUrl: './type-video.component.html',
  styleUrls: ['./type-video.component.css']
})
export class TypeVideoComponent implements OnInit {
 // Mục khai báo biến
 title = 'Danh mục video';
 id: number;
 // Id:number;
 // isEdit: boolean = true;
 searchText: any;
 type_video :any;
 //phân trang
 // POSTS: any;
 page: number = 1;
 count: number = 0;
 tableSize: number = 5;
 tableSizes: any = [5, 10, 15, 20];
 //end

 constructor(
   private admin: ApiService,
   private toastr: ToastrService,
   private router: Router,
   private data_service: ComponentService,
 ) { }

 from_type_video: FormGroup = new FormGroup({
   // id: new FormControl(),
   name: new FormControl('', Validators.required),
   description: new FormControl('', Validators.required),
 });
 // gửi title đi
 send_title() {
   this.data_service.Title_message(this.title);
   // console.log('data',this.data_service.Title_message('Danh111'));
 }
 ngOnInit() {
   this.send_title();
   this.get_all_type_video();
 }
//all
get_all_type_video() {
 this.admin.get_all_type_video().subscribe(
   (data: any) => {
     this.type_video = data;
     console.log(this.type_video);
   },
   (error) => {
     console.log(error);
   }
 );
}


// thêm mới
onCreate() {
 // this.submitted=true;
 this.admin.create_type_video(this.from_type_video.value).subscribe((data) => {
     // this.from_type_video.reset();
     this.resetForm();
     this.get_all_type_video();
     this.toastr.success('Thêm mới thành công!', );

   },
   (error) => {
     this.toastr.error('Thêm thất bại!');
   });
}
resetForm() {
 this.from_type_video.reset();
}

get_id(id: number)
{
   //  this.id = this._router.snapshot.params['id'];
   this.id =id;
   console.log('id',id)
 this.admin.get_type_video(id).subscribe(data => {
   // console.log('1',data)
   this.from_type_video = new FormGroup({
     name: new FormControl(data.name,Validators.required),
   });
 })
}

onEdit() {

 this.admin.update_type_video(this.id, this.from_type_video.value).subscribe(data => {
   this.from_type_video.reset();
   this.get_all_type_video();
   this.toastr.success('Cập nhật thành công!', );
 },
 (error) => {
   this.toastr.error('cập nhật thất bại!');
 });
}

onDelete(id: number) {
 this.admin.delete_type_video(id).subscribe((data) => {
   this.get_all_type_video();
   this.toastr.success('Xóa thành công!', );
 },
 (error) => {
   this.toastr.error('Xóa thất bại!');
 });
}

openModal(id: number): void {
 this.id = id; // lưu lại id vào một biến trong component
 this.title = 'Bạn có chắc chắn muốn xóa?'; // hiển thị thông báo xác nhận
}


updateStatus(id: number, status: number) {
  console.log('id', id);
  this.admin.update_status_type_video(id, status)
    .subscribe(
      response => {
        // Find the category with the given id and update its status
        let cate = this.type_video.find((c:any) => c.id === id);
        if (cate) {
          cate.status = status;
        }

        // Show the appropriate message
        if (status === 1) {
          this.toastr.success('Kích hoạt trạng thái thành công!');
        } else {
          this.toastr.success('Ngừng kích hoạt trạng thái thành công!');
        }
      },
      error => {
        if (status === 1) {
          this.toastr.error('Kích hoạt trạng thái thất bại!');
        } else {
          this.toastr.error('Ngừng kích hoạt trạng thái thất bại!');
        }
        console.error(error);
      }
    );
}

toggleSwitch(id: number, status: number) {
  this.updateStatus(id, status === 1 ? 0 : 1); // Đảo ngược trạng thái (1 -> 0, 0 -> 1)
}
//phân trang
ontableDataChange(event: any) {
 this.page = event;
 this.get_all_type_video();
}
ontableSizeChange(event: any): void {
 this.tableSize = event.target.value;
 this.page = 1;
 this.get_all_type_video();
}

}
