import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from '../../../../core/services/component.service';
import { ToastrService } from 'ngx-toastr';
// import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  private subscription: Subscription;
  // Mục khai báo biến
  category: any;
  title='Danh mục sản phẩm';
  categoryId :any;
  id: number;
  // isEdit: boolean = true;
  searchText:any;

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
    // public dialog: MatDialog
    ) {}

  category_product_from: FormGroup = new FormGroup({
    // id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  isInvalidField(fieldName: string) {
    const fieldControl = this.category_product_from.get(fieldName);
    return fieldControl?.invalid;
  }

  // validate
  getErrorMessage(fieldName: string) {
    const fieldControl = this.category_product_from.get(fieldName);
    if (fieldName === 'name') {
      if (fieldControl?.hasError('required')) {
        return 'Tên danh mục không được để trống.';
      }
    }

    return undefined;
    // Các thông báo lỗi khác cho các trường khác
  }
  ngOnInit() {
    this.get_all_category_product();
    this.send_title();
    const successMessage = sessionStorage.getItem('successMessage');
    if (successMessage) {
      this.toastr.success(successMessage);
      sessionStorage.removeItem('successMessage'); // Xóa thông báo thành công từ sessionStorage
    }

    const errorMessage = sessionStorage.getItem('errorMessage');
    if (errorMessage) {
      this.toastr.error(errorMessage);
      sessionStorage.removeItem('errorMessage'); // Xóa thông báo thất bại từ sessionStorage
    }
  }

  // gửi title đi
  send_title() {
    this.data_service.Title_message(this.title);
    // console.log('data',this.data_service.Title_message('Danh111'));
  }

  get_all_category_product() {
    this.subscription = this.admin.getallcategory_product().subscribe(
      (data: any) => {
        this.category = data.category;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  submitted = false;
  onCreate() {
    // this.submitted=true;
    this.submitted = true;
    if (this.category_product_from.invalid) {
      // alert('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc.');
      this.toastr.error('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc!');
      return;
    }
    this.admin.create_category_product(this.category_product_from.value).subscribe((data) => {
        // this.category_product_from.reset();
        // console.log(data);
        // this.get_all_category_product();
        // window.location.reload();
        // window.location.href = window.location.href;
        // this.toastr.success('Thêm mới thành công!', );
        sessionStorage.setItem('successMessage', 'Thêm mới thành công!'); // Lưu thông báo thành công trong sessionStorage
        window.location.reload(); // Reload lại trang
      },
      (error) => {
        // this.toastr.error('Thêm thất bại!');
        sessionStorage.setItem('errorMessage', 'Thêm thất bại!'); // Lưu thông báo thất bại trong sessionStorage
        window.location.reload(); // Reload lại trang
      });
  }
  resetForm() {
    this.category_product_from.reset();
  }

  get_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
    this.admin.get_category(id).subscribe(data => {
      // console.log('1',data)
      this.category_product_from = new FormGroup({
        name: new FormControl(data.name,Validators.required),
        description: new FormControl(data.description),
      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }

  onEdit() {

    this.admin.update_category(this.id, this.category_product_from.value).subscribe(data => {
      this.router.navigate(['/category']);
      this.category_product_from.reset();
      // console.log(data);
      this.get_all_category_product();
      this.toastr.success('Cập nhật thành công!' );
    },
    (error) => {
      this.toastr.error('cập nhật thất bại!');
    });
  }

  onDelete(id: number) {
    this.admin.delete_category(id).subscribe((data) => {
      this.get_all_category_product();
      this.toastr.success('Xóa thành công!', );
    },
    (error) => {
      this.toastr.error('Xóa thất bại!');
    });
  }

  openModal(id: number): void {
    this.categoryId = id; // lưu lại id vào một biến trong component
    this.title = 'Bạn có chắc chắn muốn xóa?'; // hiển thị thông báo xác nhận
  }
  // update_status(id: number, status: number){
  //   console.log('id',id);
  //   this.admin.update_status_category(id, status)
  //   .subscribe(
  //     response => {
  //       // console.log(response.message);
  //       this.toastr.success('Kích hoạt trạng thái thành công!', );
  //       // Xử lý logic sau khi cập nhật thành công
  //     },
  //     error => {
  //       this.toastr.error('Kích hoạt trạng thái thất bại!');
  //       console.error(error);
  //       // Xử lý logic khi gặp lỗi
  //     }
  //   );
  // }
  // isSwitchOn: boolean = true;
  // toggleSwitch(id: number, status: number) {
  //   this.isSwitchOn = !this.isSwitchOn; // Thay đổi trạng thái của switch

  //   // Gọi hàm cập nhật trạng thái chỉ khi switch được bật (isSwitchOn = true)
  //   if (this.isSwitchOn) {
  //     this.update_status(id, status);
  //   }
  // }
  // Component.ts
// updateStatus(id: number, status: number) {
//   console.log('id', id);
//   this.admin.update_status_category(id, status)
//     .subscribe(
//       response => {
//         // console.log(response.message);
//         if (status === 1) {
//           this.toastr.success('Kích hoạt trạng thái thành công!');
//         } else {
//           this.toastr.success('Tắt trạng thái thành công!');
//         }
//         // Xử lý logic sau khi cập nhật thành công
//       },
//       error => {
//         if (status === 1) {
//           this.toastr.error('Kích hoạt trạng thái thất bại!');
//         } else {
//           this.toastr.error('Tắt trạng thái thất bại!');
//         }
//         console.error(error);
//         // Xử lý logic khi gặp lỗi
//       }
//     );
// }
updateStatus(id: number, status: number) {
  console.log('id', id);
  this.admin.update_status_category(id, status)
    .subscribe(
      response => {
        // Find the category with the given id and update its status
        let cate = this.category.find((c:any) => c.id === id);
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
      this.get_all_category_product();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.get_all_category_product();
    }
}
