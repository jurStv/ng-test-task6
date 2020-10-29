import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { equals, includes } from 'ramda';

import { STATIONS_DATA } from '../test-data';

@Injectable()
export class ApiStationsInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!includes(request.url, '/api/stations') || !equals(request.method, 'GET')) {
      return next.handle(request);
    }

    return of(new HttpResponse({ status: 200, body: STATIONS_DATA }));
  }
}
