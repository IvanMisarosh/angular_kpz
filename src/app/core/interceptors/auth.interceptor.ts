import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken = localStorage.getItem('accessToken');
    console.log('Access token: ', accessToken);

    if (accessToken) {
      // debugger;
      request = request.clone({
        // setHeaders: {
        //   Authorization: `Bearer ${accessToken}`
        // }
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)

      });
      console.log("Headers: ", request.headers)
      console.log('Access token found, adding to request');
      console.log('Request: ', request);
    }

    return next.handle(request).pipe(
      catchError(error => {
        console.log('Error: ', error);
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;

          return this.authService.refreshToken().pipe(
            switchMap(() => {
              this.isRefreshing = false;
              const newToken = localStorage.getItem('accessToken');

              console.log('New token: ', newToken);
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });

              console.log('Request: ', newRequest);
              return next.handle(newRequest);



              // Clone request with new token
              // return next.handle(request.clone({
              //   setHeaders: {
              //     Authorization: `Bearer ${newToken}`
              //   }
              // }));

              // console.log('Request: ', newRequest);
              // return next.handle(newRequest);
            }),
            catchError(refreshError => {
              this.isRefreshing = false;
              this.authService.logout();
              console.error('Failed to refresh token');
              return throwError(refreshError);
            })
          );
        }

        return throwError(error);
      })
    );
  }
}
