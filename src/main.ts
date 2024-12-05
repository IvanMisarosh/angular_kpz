import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import {provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Allows multiple interceptors if needed
    },
    provideRouter(routes)
  ]
}).catch(err => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes)
//   ]
// }).catch(err => console.error(err));
