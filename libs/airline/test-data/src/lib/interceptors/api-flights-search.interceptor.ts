import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { equals, filter, gte, includes, is, lte, pathSatisfies, propEq, propSatisfies } from 'ramda';
import * as dayjs from 'dayjs';

import { FLIGHTS_DATA } from '../test-data';

@Injectable()
export class ApiFlightsSearchInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!includes(request.url, '/api/flight/search') || !equals(request.method, 'GET')) {
      return next.handle(request);
    }

    const destination = Number(request.params.get('destination'));
    const origin = Number(request.params.get('origin'));
    const minPrice = Number(request.params.get('minPrice'));
    const maxPrice = Number(request.params.get('maxPrice'));
    const connections = Number(request.params.get('connections'));
    const fromDate = Number(request.params.get('fromDate'));
    const toDate = Number(request.params.get('toDate'));

    let flights: any = FLIGHTS_DATA;

    if (is(Number, destination)) {
      flights = filter(propEq('destination', destination), flights);
    }
    if (is(Number, origin)) {
      flights = filter(propEq('origin', origin), flights);
    }
    if (is(Number, maxPrice)) {
      flights = filter(propSatisfies(gte(maxPrice), 'price'), flights);
    }
    if (is(Number, minPrice)) {
      flights = filter(propSatisfies(lte(minPrice), 'price'), flights);
    }
    if (is(Number, connections)) {
      flights = filter(pathSatisfies(gte(connections+1), ['connections', 'length']), flights);
    }
    if (is(Number, fromDate)) {
      flights = filter(propSatisfies((startAt: number) => dayjs(startAt).isAfter(fromDate) || dayjs(startAt).isSame(fromDate), 'startAt'), flights);
    }
    if (is(Number, toDate)) {
      flights = filter(propSatisfies((startAt: number) => dayjs(startAt).isBefore(toDate) || dayjs(startAt).isSame(toDate), 'startAt'), flights);
    }

    return of(new HttpResponse({ status: 200, body: flights }));
  }
}
