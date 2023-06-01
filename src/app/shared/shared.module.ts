import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DeleteComponent } from './components/delete/delete.component';
import { CartComponent } from './layout/cart/cart.component';
import { BannerComponent } from './layout/banner/banner.component';
import { Modal1Component } from './layout/modal1/modal1.component';
import { Back_to_topComponent } from './layout/back_to_top/back_to_top.component';
import { Hearder_mainComponent } from './layout/hearder_main/hearder_main.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    DeleteComponent,
    SidebarComponent,
    CartComponent,
    BannerComponent,
    Modal1Component,
    Back_to_topComponent,
    Hearder_mainComponent
  ],
  exports: [
    FooterComponent,
    NotFoundComponent,
    HeaderComponent,
    DeleteComponent,
    SidebarComponent,
    CartComponent,
    BannerComponent,
    Modal1Component,
    Back_to_topComponent,
    Hearder_mainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule { }
