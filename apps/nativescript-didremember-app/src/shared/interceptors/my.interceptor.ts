import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { ApplicationSettings } from '@nativescript/core';
import { environment } from '../../environments/environment';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = ApplicationSettings.getString(environment.auth.token, '');
    if (token) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }
    return next.handle(httpRequest);
  }
}
