import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './dashboard/component/index/index.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './dashboard/component/category/category.component';
import { HttpClientModule } from '@angular/common/http';
// import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './dashboard/account/login/login.component';
import { RegisterComponent } from './dashboard/account/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';
import { BlockPageLoginGuard } from '../core/guards/block-page-login.guard';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SupplierComponent } from './dashboard/component/supplier/supplier.component';
import { Product_listComponent } from './dashboard/component/product/product_list/product_list.component';
import { WarehouseComponent } from './dashboard/component/warehouse/warehouse.component';
import { OrderComponent } from './dashboard/component/order/order.component';
import { OrderHistoryComponent } from './dashboard/component/order-history/order-history.component';
import { TransportComponent } from './dashboard/component/transport/transport.component';
import { Product_addComponent } from './dashboard/component/product/product_add/product_add.component';
import { Product_editComponent } from './dashboard/component/product/product_edit/product_edit.component';
// import { CKEditorModule } from 'ckeditor4-angular';
import { Warehouse_updateComponent } from './dashboard/component/warehouse/warehouse_update/warehouse_update.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { BrandsComponent } from './dashboard/component/brands/brands.component';
import { CustomerComponent } from './dashboard/component/customer/customer.component';
import { PostComponent } from './dashboard/component/post/post/post.component';
import { Type_postComponent } from './dashboard/component/post/type_post/type_post.component';
import { TypeVideoComponent } from './dashboard/component/video/type-video/type-video.component';
import { VideoComponent } from './dashboard/component/video/video/video.component';
import { Import_ordersComponent } from './dashboard/component/warehouse/import_orders/import_orders.component';
import { VoucherComponent } from './dashboard/component/voucher/voucher.component';
import { Order_processingComponent } from './dashboard/component/order_/order_processing/order_processing.component';
import { Order_cancelComponent } from './dashboard/component/order_/order_cancel/order_cancel.component';
import { Order_successComponent } from './dashboard/component/order_/order_success/order_success.component';
import { Orders_are_being_deliveredComponent } from './dashboard/component/order_/orders_are_being_delivered/orders_are_being_delivered.component';
import { Export_ordersComponent } from './dashboard/component/warehouse/export_orders/export_orders.component';
import { BannerComponent } from './dashboard/component/Web_user/banner/banner.component';
import { NgChartsModule } from 'ng2-charts';
import { Store_informationComponent } from './dashboard/component/Web_user/store_information/store_information.component';

const router_home:Routes=[
  {
  path:"",
  component: DashboardComponent,
  canActivate: [AuthGuardGuard],
  children:[
    {
      path:"dashboard",
      component:IndexComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"product",
      component:Product_listComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"product-add",
      component:Product_addComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"product-edit/:id",
      component:Product_editComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"category",
      component:CategoryComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"supplier",
      component:SupplierComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"warehouse",
      component:WarehouseComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"order",
      component:OrderComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"order-history",
      component:OrderHistoryComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"transport",
      component:TransportComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"Warehouse-update",
      component:Warehouse_updateComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"Import-orders",
      component:Import_ordersComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"Export-orders",
      component:Export_ordersComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"brands",
      component:BrandsComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"customer",
      component:CustomerComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"post",
      component:PostComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"type-post",
      component:Type_postComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"type-video",
      component:TypeVideoComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"video",
      component:VideoComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"voucher",
      component:VoucherComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"order_processing",
      component:Order_processingComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"order_cancel",
      component:Order_cancelComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"order_success",
      component:Order_successComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"orders_are_being_delivered",
      component:Orders_are_being_deliveredComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"banner",
      component:BannerComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"store_information",
      component:Store_informationComponent,
      canActivate: [AuthGuardGuard],
    },

    // {
    //   path:"chi-tiet-san-pham/:id",
    //   component:DetailComponent,
    // },

  ],

},
{
  path:"login",
  component:LoginComponent,
  canActivate: [BlockPageLoginGuard],
},
{
  path:"register",
  component:RegisterComponent,
},
]
@NgModule({

  declarations: [
    DashboardComponent,
    IndexComponent,
    Product_listComponent,
    Product_addComponent,
    Product_editComponent,
    CategoryComponent,
    SupplierComponent,
    LoginComponent,
    RegisterComponent,
    WarehouseComponent,
    OrderComponent,
    OrderHistoryComponent,
    TransportComponent,
    Warehouse_updateComponent,
    BrandsComponent,
    CustomerComponent,
    PostComponent,
    Type_postComponent,
    TypeVideoComponent,
    VideoComponent,
    Import_ordersComponent,
    VoucherComponent,
    Order_processingComponent,
    Order_cancelComponent,
    Order_successComponent,
    Export_ordersComponent,
    Orders_are_being_deliveredComponent,
    BannerComponent,
    Store_informationComponent,


  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    CKEditorModule,
    // ClassicEditor,
    // CKEditorModule,
    // CKEditorModule,
    // BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    NgChartsModule,
    // ChartsModule
    // NgxPaginationModule,
    RouterModule.forChild(router_home)
  ],
})
export class AdminModule { }
