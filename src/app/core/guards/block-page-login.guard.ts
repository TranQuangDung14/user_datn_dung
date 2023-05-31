import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class BlockPageLoginGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(
    private admin: ApiService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.admin.isLoggedIn()) {
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      })
      return false;
    }
    return true;
  }

  // constructor(private admin: ApiService, private router: Router) {}

  // canActivate(): boolean {
  //   if (this.admin.isLoggedIn()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

}
