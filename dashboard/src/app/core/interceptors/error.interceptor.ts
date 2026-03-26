import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Error desconocido';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 0: errorMessage = 'Error de conexión.'; break;
          case 400: errorMessage = error.error?.message || 'Datos inválidos'; break;
          case 401: errorMessage = 'Sesión expirada.'; break;
          case 404: errorMessage = 'Recurso no encontrado.'; break;
          case 500: errorMessage = 'Error del servidor.'; break;
          default: errorMessage = error.error?.message || `Error ${error.status}`;
        }
      }
      console.error('API Error:', errorMessage);
      return throwError(() => error);
    })
  );
};
