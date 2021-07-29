import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('token');
    let myHeader = new HttpHeaders({
        'content-type' : 'application/json',
        'Authorization' : userToken 
      })
    if (!userToken) {
      return next.handle(request);
    }
    console.log("User tokenns")
    const modifiedReq = request.clone({
      headers: myHeader
    });
    return next.handle(modifiedReq);
  }
}
