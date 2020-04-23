import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginRequest } from '../login/login.actions';

@Injectable({
  providedIn: 'root'
})

export class DashboardGuard implements CanActivate {
  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { code } = next.queryParams;
    this.store.dispatch(new LoginRequest(code));

    return code ? true : this.router.createUrlTree(['/login-page']);
  }
}
