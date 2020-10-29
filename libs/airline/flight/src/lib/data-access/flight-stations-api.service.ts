import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStation } from '@airline/model';

@Injectable({
  providedIn: 'root'
})
export class FlightStationsApiService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  getStations(): Observable<IStation[]> {
    return this.http.get<IStation[]>('/api/stations');
  }
}
