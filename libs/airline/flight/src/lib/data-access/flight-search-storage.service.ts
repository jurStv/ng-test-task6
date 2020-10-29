import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IFlight } from '@airline/model';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchStorageService {
  private resultsSource = new BehaviorSubject<ReadonlyArray<IFlight>>([]);

  get result$() {
    return this.resultsSource.asObservable();
  }

  constructor() { }

  updateResults(results: ReadonlyArray<IFlight>): void {
    this.resultsSource.next(results);
  }
}
