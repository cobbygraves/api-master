import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes(`${environment.baseURL}/posts`)) {
    const token = localStorage.getItem('authToken');
    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      console.log('Request With Token: ', authReq);
      return next(authReq).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            console.log('HTTP Response: ', event);
          }
        })
      );
    }
  }
  return next(req);
};
