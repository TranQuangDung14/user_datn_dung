import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './Users.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { BlogsComponent } from './component/blogs/blogs.component';
import { CartsComponent } from './component/carts/carts.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ContactComponent } from './component/contact/contact.component';
import { DetailsComponent } from './component/details/details.component';
import { OrderComponent } from './component/order/order.component';
import { ProductComponent } from './component/product/product.component';
import { VideoComponent } from './component/video/video.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { BlockPageLoginGuard } from '../core/guards/block-page-login.guard';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';

const router_home:Routes=[
  {
    path:"",
    component: UsersComponent,
    children:[
      {
        path:"",
        component: IndexComponent,
      },
      {
        path:"chi-tiet-san-pham",
        component: DetailsComponent,
      },
      {
        path:"bai-viet",
        component: BlogsComponent,
      },
      {
        path:"cua-hang",
        component: ProductComponent,
      },
      {
        path:"video",
        component: VideoComponent,
      },
      {
        path:"lien-he",
        component: ContactComponent,
      },
      {
        path:"don-hang",
        component: OrderComponent,
        // canActivate: [AuthGuardGuard],
      },
      {
        path:"gio-hang",
        component: CartsComponent,
        // canActivate: [AuthGuardGuard],
      },
      {
        path:"thanh-toan",
        component: CheckoutComponent,
        // canActivate: [AuthGuardGuard],
      },
    ]
  },
  {
    path:"login",
    component:LoginComponent,
    // canActivate: [BlockPageLoginGuard],
  },
  {
    path:"register",
    component:RegisterComponent,
  },

]
@NgModule({
  declarations: [
    UsersComponent,
    IndexComponent,
    BlogsComponent,
    CartsComponent,
    CheckoutComponent,
    ContactComponent,
    DetailsComponent,
    OrderComponent,
    ProductComponent,
    VideoComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(router_home)
  ],

})
export class UsersModule { }