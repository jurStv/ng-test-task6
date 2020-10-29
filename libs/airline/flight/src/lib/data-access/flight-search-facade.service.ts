import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

import { ISearchFlightParams } from '@airline/model';

import { FlightSearchApiService } from './flight-search-api.service';
import { FlightSearchStorageService } from './flight-search-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchFacadeService {
  private searchTrigger = new Subject<ISearchFlightParams>();

  get flight$() {
    return this.storage.result$;
  }

  constructor(
    private readonly api: FlightSearchApiService,
    private readonly storage: FlightSearchStorageService,
  ) {
    this.searchTrigger.asObservable().pipe(
      debounceTime(300),
      switchMap((params) => this.api.search(params)),
      tap((flights) => this.storage.updateResults(flights)),
    ).subscribe();
  }

  /* Initiate search request */
  search(params: ISearchFlightParams): void {
    this.searchTrigger.next(params);
  }
}
