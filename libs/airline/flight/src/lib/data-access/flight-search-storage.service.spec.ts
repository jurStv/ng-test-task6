import { IFlight } from '@airline/model';
import { TestBed, inject } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { FlightSearchStorageService } from './flight-search-storage.service';

describe('FlightSearchStorageService', () => {
  let searchResults: ReadonlyArray<IFlight>;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    searchResults = [
      {
        id: 1,
        origin: 1,
        destination: 3,
        price: 114.7,
        startAt: Date.now(),
        endAt: Date.now(),
        duration: 99999,
        connections: [],
      },
    ];
  });

  it('should be created', inject(
    [FlightSearchStorageService],
    (service: FlightSearchStorageService) => {
      expect(service).toBeTruthy();
  }));

  it('should include empty list as initial value', inject(
    [FlightSearchStorageService],
    async (service: FlightSearchStorageService) => {
      const results = await service.result$.pipe(take(1)).toPromise();
      expect(results).toHaveLength(0);
  }));

  it('should update flights results', inject(
    [FlightSearchStorageService],
    async (service: FlightSearchStorageService) => {
      service.updateResults(searchResults);

      const results = await service.result$.pipe(take(1)).toPromise();
      expect(results).toHaveLength(1);
      expect(results).toEqual(searchResults);
  }));
});
