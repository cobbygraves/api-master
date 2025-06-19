import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      if (error.status === 400) {
        errorMessage = 'Posts not found';
      } else if (error.status === 500) {
        errorMessage = 'Internal server error';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized';
      } else if (error.status === 404) {
        errorMessage = 'Invalid url';
      } else {
        errorMessage = 'An error occured';
      }

      return throwError(() => errorMessage);
    })
  );
};
