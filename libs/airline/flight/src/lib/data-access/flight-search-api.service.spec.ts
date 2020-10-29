import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISearchFlightParams } from '@airline/model';

import { FlightSearchApiService } from './flight-search-api.service';

describe('FlightSearchApiService', () => {
  let params: ISearchFlightParams;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightSearchApiService],
    });
    params = {
      connections: 1,
      origin: 1,
      destination: 2,
      fromDate: 1111,
      toDate: 2222,
      maxPrice: 100,
      minPrice: 1,
    };
  });

  it('should be created', inject(
    [FlightSearchApiService, HttpTestingController],
    (service: FlightSearchApiService, httpMock: HttpTestingController) => {
      expect(service).toBeTruthy();
  }));

  it('should make request with valid parameters', inject(
    [FlightSearchApiService, HttpTestingController],
    (service: FlightSearchApiService, httpMock: HttpTestingController) => {
      service.search(params).subscribe();

      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === '/api/flight/search'
      );

      expect(mockReq.request.params.get('connections')).toEqual('1');
      expect(mockReq.request.params.get('origin')).toEqual('1');
      expect(mockReq.request.params.get('destination')).toEqual('2');
      expect(mockReq.request.params.get('fromDate')).toEqual('1111');
      expect(mockReq.request.params.get('toDate')).toEqual('2222');
      expect(mockReq.request.params.get('maxPrice')).toEqual('100');
      expect(mockReq.request.params.get('minPrice')).toEqual('1');

      httpMock.verify();
  }));
});
