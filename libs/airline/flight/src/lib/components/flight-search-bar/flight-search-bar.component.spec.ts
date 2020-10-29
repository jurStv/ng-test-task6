import { Component, ViewChild } from '@angular/core';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as dayjs from 'dayjs';

import { AirlineFlightModule } from '../../airline-flight.module';

import { FlightSearchBarHarness } from './flight-search-bar.harness';
import { FlightSearchBarComponent } from './flight-search-bar.component';

describe('FlightSearchBarComponent', () => {
  @Component({
    template: `
      <airline-flight-search-bar [stations]="stations" (search)="handleSearch($event)"></airline-flight-search-bar>
    `,
  })
  class TestHostComponent {
    @ViewChild(FlightSearchBarComponent) searchBar: FlightSearchBarComponent;
    stations = [
      {
        id: 1,
        name: 'Minsk',
      },
      {
        id: 2,
        name: 'Istanbul'
      },
    ];

    handleSearch = jest.fn(() => {});
  }

  let harness: FlightSearchBarHarness;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AirlineFlightModule, NoopAnimationsModule],
      declarations: [ TestHostComponent ]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(FlightSearchBarHarness);
  });

  it('should create', async () => {
    const element = await harness.host();

    expect(element).toBeTruthy();
  });

  it('should show correct origin options for search query', async () => {
    const options = await harness.getOriginOptionsForQuery('Min');
    const [option] = options;
    const optionText = await option.getText();
    expect(options).toHaveLength(1);
    expect(optionText).toEqual('Minsk');
  });

  it('should show correct destination options for search query', async () => {
    const options = await harness.getDestinationOptionsForQuery('Ist');
    const [option] = options;
    const optionText = await option.getText();
    expect(options).toHaveLength(1);
    expect(optionText).toEqual('Istanbul');
  });

  it('should emit correct search params', async () => {
    const startDate = dayjs();
    const endDate = dayjs().add(7, 'day');
    await harness.setOriginOptionForQuery('Minsk');
    await harness.setDestinationOptionForQuery('Istanbul');
    await harness.setDatesRangeValues(startDate.toISOString(), endDate.add(7, 'day').toISOString());
    await harness.submitSearchForm();

    const { fromDate, toDate } = fixture.componentInstance.searchBar.convertedModel;
    expect(fixture.componentInstance.handleSearch).toHaveBeenCalled();
    expect(fixture.componentInstance.handleSearch).toHaveBeenCalledWith({
      origin: 1,
      destination: 2,
      minPrice: 0,
      maxPrice: 1000,
      connections: 3,
      fromDate,
      toDate,
    });
  });
});
