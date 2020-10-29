import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { compose, filter, isNil, map, not, toString } from 'ramda';

import { ISearchFlightParams, IFlight } from '@airline/model';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchApiService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  search(searchParams: ISearchFlightParams): Observable<IFlight[]> {
    const params: any = compose(
      map(toString),
      filter(compose(not, isNil)),
    )(searchParams);

    return this.http.get<IFlight[]>('/api/flight/search', { params });
  }
}
