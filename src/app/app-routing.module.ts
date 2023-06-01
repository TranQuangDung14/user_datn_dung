import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path:"",
  //   loadChildren:() =>
  //   import('./Admin/Admin.module').then((m)=>m.AdminModule),
  // },
  {
    path:"",
    loadChildren:() =>
    import('./Users/Users.module').then((m)=>m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
