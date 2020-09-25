import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad,
  Route,
} from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

/**
 * 路由守卫
 * ref => https://angular.cn/guide/router#milestone-5-route-guards
 */
@Injectable()
export class AuthGuardService
  implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router
  ) {}

  // 没有权限依然会加载模块
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  // 会在任何子路由被激活之前运行
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }

  // 没有权限不会加载模块（会阻塞预加载）
  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    const token: any = this.authService.getAuthorizationToken();
    if (token) {
      return true;
    }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    // Create a dummy session id
    const sessionId = Math.random();
    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: { session_id: sessionId },
      fragment: 'anchor',
    };
    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
}
