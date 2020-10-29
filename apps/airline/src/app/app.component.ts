import { Component, OnInit } from '@angular/core';
import { OnDestroy$, takeUntilDestroyed } from '@pdtec/ngx-observable-lifecycle';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { FlightSearchFacadeService, FlightStationsApiService } from '@airline/flight';
import { IFlight, ISearchFlightParams, IStation } from '@airline/model';

import { detailExpand } from './app.animations';
import { compose, partialRight, path, prop, sortWith, toLower, useWith } from 'ramda';

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'airline-test-task-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [detailExpand],
})
export class AppComponent extends OnDestroy$ implements OnInit {
  columnsToDisplay = ['origin', 'destination', 'price', 'connections', 'duration', 'startAt', 'endAt'];
  expandedElement: IFlight | null;
  stations: IStation[];
  stationsDict: {[key: string]: string;};
  flight$: Observable<ReadonlyArray<IFlight>>;
  private sortChangeSource$ = new BehaviorSubject<Sort>({ active: 'startAt', direction: 'desc' });

  constructor(
    private readonly searchFlight: FlightSearchFacadeService,
    private readonly stationsApi: FlightStationsApiService,
  ) {
    super();
  }

  ngOnInit(): void {
    /* Create flights data source based on sorting options */
    this.flight$ = combineLatest([
      this.sortChangeSource$.asObservable(),
      this.searchFlight.flight$,
    ]).pipe(map(([sort, flights]) => this.sortFlights(sort, flights)));
    /* Get all stations */
    this.stationsApi.getStations().pipe(
      takeUntilDestroyed(this),
      tap((stations) => {
        this.stations = stations;
        this.stationsDict = stations.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {});
      })
    ).subscribe();
  }

  /* Function to sort flights based on sorting options */
  private sortFlights(sort: Sort, flights: ReadonlyArray<IFlight>): ReadonlyArray<IFlight> {
    const sorter = partialRight(compare, [sort.direction === 'asc']);
    switch (sort.active) {
      case 'origin':
        const toLowerOrigin = compose(toLower, (id: number) => this.stationsDict[id], prop('origin'));
        flights = sortWith(
          [useWith(sorter, [toLowerOrigin, toLowerOrigin])],
          flights,
        );
        break;
      case 'destination':
        const toLowerDestination = compose(toLower, (id: number) => this.stationsDict[id], prop('destination'));
        flights = sortWith(
          [useWith(sorter, [toLowerDestination, toLowerDestination])],
          flights,
        );
        break;
      case 'price':
        flights = sortWith(
          [useWith(sorter, [prop('price'), prop('price')])],
          flights,
        );
        break;
      case 'connections':
        flights = sortWith(
          [useWith(sorter, [path(['connections', 'length']), path(['connections', 'length'])])],
          flights,
        );
        break;
      case 'duration':
        flights = sortWith(
          [useWith(sorter, [prop('duration'), prop('duration')])],
          flights,
        );
        break;
      case 'startAt':
        flights = sortWith(
          [useWith(sorter, [prop('startAt'), prop('startAt')])],
          flights,
        );
        break;
      case 'endAt':
        flights = sortWith(
          [useWith(sorter, [prop('endAt'), prop('endAt')])],
          flights,
        );
        break;
    }

    return flights;
  }

  /* Handle search request */
  handleSearch(params: ISearchFlightParams): void {
    this.searchFlight.search(params);
  }

  /* Show details with connection for the flight */
  expandFlight(flight: IFlight) {
    if (flight === this.expandedElement) {
      this.expandedElement = null;
    } else if (flight.connections.length !== 0) {
      this.expandedElement = flight;
    }
  }

  /* Handle sort change */
  sortData(sort: Sort) {
    this.sortChangeSource$.next(sort);
  }
}
