import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FlightStationsApiService } from './flight-stations-api.service';

describe('FlightStationsApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightStationsApiService],
    });
  });

  it('should be created', inject(
    [FlightStationsApiService, HttpTestingController],
    (service: FlightStationsApiService, httpMock: HttpTestingController) => {
      expect(service).toBeTruthy();
  }));

  it('should make request', inject(
    [FlightStationsApiService, HttpTestingController],
    (service: FlightStationsApiService, httpMock: HttpTestingController) => {
      service.getStations().subscribe();

      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === '/api/stations'
      );

      expect(mockReq).toBeTruthy();

      httpMock.verify();
  }));
});
