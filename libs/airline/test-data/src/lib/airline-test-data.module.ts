import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiFlightsSearchInterceptor, ApiStationsInterceptor } from './interceptors';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiFlightsSearchInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiStationsInterceptor,
      multi: true,
    },
  ],
})
export class AirlineTestDataModule {}
