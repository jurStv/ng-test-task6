import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AirlineSharedModule } from '@airline/shared';

import { FlightSearchBarComponent } from './components';

@NgModule({
  imports: [AirlineSharedModule, FormsModule, ReactiveFormsModule],
  declarations: [FlightSearchBarComponent],
  exports: [FlightSearchBarComponent],
})
export class AirlineFlightModule {}
