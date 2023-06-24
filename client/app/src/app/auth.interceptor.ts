import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage?.getItem('accessToken');

    if (token) {
      // Clone the request and add the token to the headers
      const modifiedRequest = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

     // Pass the modified request to the next handler
     return next.handle(modifiedRequest);
    }

    // If no token, proceed with the original request
    return next.handle(request);
  }
}
