import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private admin :ApiService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.admin.islog.pipe(
        // kiểm tra xem đã đăng nhập hay chưa
        tap((isLoggedIn:any)=>{
          if(!isLoggedIn){
            alert("bạn cần đăng nhập để vào page này");
            this.router.navigate(['/login']);
          }
        })
      );

  }

}
