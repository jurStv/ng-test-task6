import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AirlineSharedModule } from '@airline/shared';
import { AirlineFlightModule } from '@airline/flight';
import { AirlineTestDataModule } from '@airline/test-data';
import { environment } from '@airline/env';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AirlineSharedModule,
    AirlineFlightModule,
    /* In case we are in dev mode or e2e mode - setup module for test data */
    environment.production ? [] : AirlineTestDataModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
