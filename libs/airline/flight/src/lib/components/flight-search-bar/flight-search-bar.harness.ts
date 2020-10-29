import { AsyncFactoryFn, ComponentHarness } from '@angular/cdk/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatEndDateHarness, MatStartDateHarness } from '@angular/material/datepicker/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

export class FlightSearchBarHarness extends ComponentHarness {
  static hostSelector = 'airline-flight-search-bar';

  protected getAutocompletes: AsyncFactoryFn<MatAutocompleteHarness[]> = this.locatorForAll(MatAutocompleteHarness);
  protected getStartDate: AsyncFactoryFn<MatStartDateHarness> = this.locatorFor(MatStartDateHarness);
  protected getEndDate: AsyncFactoryFn<MatEndDateHarness> = this.locatorFor(MatEndDateHarness);
  protected getSubmitButton: AsyncFactoryFn<MatButtonHarness> = this.locatorFor(MatButtonHarness.with({ text: 'Search' }));

  protected async getOriginAutocomplete() {
    const [
      originAutocomplete,
    ] = await this.getAutocompletes();

    return originAutocomplete;
  }

  protected async getDestinationAutocomplete() {
    const [
      _,
      destinationAutocomplete,
    ] = await this.getAutocompletes();

    return destinationAutocomplete;
  }

  async getOriginOptionsForQuery(query: string) {
    const originAutocomplete = await this.getOriginAutocomplete();
    await originAutocomplete.enterText(query);

    return originAutocomplete.getOptions();
  }

  async getDestinationOptionsForQuery(query: string) {
    const destinationAutocomplete = await this.getDestinationAutocomplete();
    await destinationAutocomplete.enterText(query);

    return destinationAutocomplete.getOptions();
  }

  async setOriginOptionForQuery(query: string) {
    const originAutocomplete = await this.getOriginAutocomplete();
    await originAutocomplete.enterText(query);

    return originAutocomplete.selectOption({ text: query });
  }

  async setDestinationOptionForQuery(query: string) {
    const destinationAutocomplete = await this.getDestinationAutocomplete();
    await destinationAutocomplete.enterText(query);

    return destinationAutocomplete.selectOption({ text: query });
  }

  async setDatesRangeValues(startDate: string, endDate: string) {
    const startInput = await this.getStartDate();
    const endInput = await this.getEndDate();
    await startInput.setValue(startDate);
    await endInput.setValue(endDate);
  }

  async submitSearchForm() {
    const button = await this.getSubmitButton();
    await button.click();
  }
}
