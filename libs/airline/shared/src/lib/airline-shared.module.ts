import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { DurationPipe } from './pipes';

const ANGULAR_MATERIAL_MODULES = [
  MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSortModule,
  MatButtonModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatCardModule,
  MatSliderModule,
  MatNativeDateModule,
  MatTableModule,
  MatSelectModule,
];

@NgModule({
  imports: [CommonModule, FlexLayoutModule, ...ANGULAR_MATERIAL_MODULES],
  declarations: [DurationPipe],
  exports: [CommonModule, FlexLayoutModule, ...ANGULAR_MATERIAL_MODULES, DurationPipe],
})
export class AirlineSharedModule {}
