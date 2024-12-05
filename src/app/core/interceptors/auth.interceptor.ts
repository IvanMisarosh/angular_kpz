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

    if (accessToken) {
      // Clone the request and add the Authorization header
      request = this.addTokenToRequest(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError(error => {
        // Handle 401 error and attempt token refresh
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;

          return this.authService.refreshToken().pipe(
            switchMap(() => {
              this.isRefreshing = false;

              // Retrieve new token and clone the request with it
              const newToken = localStorage.getItem('accessToken');
              if (newToken) {
                return next.handle(this.addTokenToRequest(request, newToken));
              }

              return throwError(() => new Error('Token refresh failed'));
            }),
            catchError(refreshError => {
              this.isRefreshing = false;
              this.authService.logout();
              return throwError(() => refreshError);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }

  /**
   * Helper function to add Authorization header to requests
   * @param request The original HTTP request
   * @param token The JWT token to add
   * @returns A cloned HTTP request with the Authorization header
   */
  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
