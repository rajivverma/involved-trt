import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }
  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }
    this.authService.redirectUrl = url;
    const sessionId = 'Bearer ' + this.getCookie('token');
    if (sessionId == null) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
