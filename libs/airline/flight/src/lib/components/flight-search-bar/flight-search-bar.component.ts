import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnDestroy$, takeUntilDestroyed } from '@pdtec/ngx-observable-lifecycle';
import { pipe, Observable } from 'rxjs';
import { map, debounceTime, tap, filter as rxfilter } from 'rxjs/operators';
import { compose, find, propEq, propOr, filter, propSatisfies, includes, isNil } from 'ramda';

import { IStation, ISearchFlightParams } from '@airline/model';

@Component({
  selector: 'airline-flight-search-bar',
  templateUrl: './flight-search-bar.component.html',
  styleUrls: ['./flight-search-bar.component.scss'],
})
export class FlightSearchBarComponent extends OnDestroy$ implements OnInit {
  @Input() stations: IStation[] = [];
  @Output() search = new EventEmitter<ISearchFlightParams>();
  @Output() changed = new EventEmitter<ISearchFlightParams>();

  formGroup: FormGroup;
  filteredOriginStation$: Observable<IStation[]>;
  filteredDestinationStation$: Observable<IStation[]>;

  connectionsOptions = [
    {
      name: 'Direct',
      value: 0,
    },
    {
      name: 'One',
      value: 1,
    },
    {
      name: 'Two or less',
      value: 2,
    },
    {
      name: 'Three or less',
      value: 3,
    },
  ];

  get maxMinPrice() {
    const maxPrice = this.formGroup.get('maxPrice').value;
    return maxPrice;
  }

  get minMaxPrice() {
    const minPrice = this.formGroup.get('minPrice').value;
    return minPrice;
  }

  get convertedModel(): ISearchFlightParams {
    const params = this.formGroup.getRawValue();

    params.fromDate = (params.fromDate as Date).getTime();
    params.toDate = (params.toDate as Date).getTime();

    return params;
  }

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      origin: [null, Validators.required],
      destination: [null, Validators.required],
      minPrice: [0, Validators.required],
      maxPrice: [1000, Validators.required],
      connections: [3, Validators.required],
      fromDate: [Date.now(), Validators.required],
      toDate: [null, Validators.required],
    });
    /* Get filter options for autocomplete */
    const stationsFiltering = pipe(
      debounceTime(300),
      map(value => typeof value === 'string' ? value : compose(
        propOr('', 'name'),
        find(propEq('id', value)),
      )(this.stations)),
      map((name: string) =>
        name ? filter(propSatisfies(includes(name), 'name'), this.stations) : this.stations.slice()
      ),
    );
    this.filteredOriginStation$ = this.formGroup.get('origin').valueChanges.pipe(stationsFiltering);
    this.filteredDestinationStation$ = this.formGroup.get('destination').valueChanges.pipe(stationsFiltering);

    this.formGroup.valueChanges.pipe(
      takeUntilDestroyed(this),
      debounceTime(300),
      rxfilter(() => this.formGroup.valid),
      tap(() => this.changed.emit(this.convertedModel)),
    ).subscribe();
  }

  /* Handle search */
  handleSearch(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.search.emit(this.convertedModel);
  }

  displayFn = (station: number): any => {
    return isNil(station) ? '' : compose(
      propOr('', 'name'),
      find(propEq('id', station)),
    )(this.stations);
  }
}
