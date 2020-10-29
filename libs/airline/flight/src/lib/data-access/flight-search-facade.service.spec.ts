import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { IFlight, ISearchFlightParams } from '@airline/model';

import { FlightSearchFacadeService } from './flight-search-facade.service';
import { FlightSearchStorageService } from './flight-search-storage.service';
import { FlightSearchApiService } from './flight-search-api.service';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

describe('FlightSearchFacadeService', () => {
  let params: ISearchFlightParams;
  let searchResults: ReadonlyArray<IFlight>;

  beforeEach(() => {
    params = {
      connections: 1,
      origin: 1,
      destination: 2,
      fromDate: 1111,
      toDate: 2222,
      maxPrice: 100,
      minPrice: 1,
    };
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
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FlightSearchApiService,
          useValue: {
            search: jest.fn(() => of(searchResults))
          }
        },
        {
          provide: FlightSearchStorageService,
          useValue: {
            updateResults: jest.fn(() => {})
          }
        },
      ],
    });
  });

  it('should be created', inject(
    [FlightSearchFacadeService],
    (service: FlightSearchFacadeService) => {
      expect(service).toBeTruthy();
  }));

  it('should make request', inject(
    [FlightSearchFacadeService, FlightSearchApiService],
    async (service: FlightSearchFacadeService, api: any) => {
      service.search(params);
      await delay(350);

      expect(api.search).toBeCalledTimes(1);
      expect(api.search).toBeCalledWith(params);
  }));

  it('should update search results', inject(
    [FlightSearchFacadeService, FlightSearchStorageService],
    async (service: FlightSearchFacadeService, storage: any) => {
      service.search(params);
      await delay(350);

      expect(storage.updateResults).toBeCalledTimes(1);
      expect(storage.updateResults).toBeCalledWith(searchResults);
  }));
});
