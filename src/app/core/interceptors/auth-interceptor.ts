import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

/**
 * This interceptor is used to add a request header to each request
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private service: AuthService;

  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/login')) {
      return next.handle(req);
    }
    this.service = this.injector.get<AuthService>(AuthService);
    // Get the auth token from the service.
    const authToken = this.service.getAuthorizationToken() || '';
    // The verbose way:
    // Clone the request and replace the original headers with cloned headers, updated with the authorization.
    // const authReq = req.clone({
    // 	headers: req.headers.set('Authorization', authToken)
    // });
    // Clone the request and set the new header in one step.
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
