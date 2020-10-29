interface IBaseFlight {
  origin: number;
  destination: number;
  startAt: number; // ms
  endAt: number; // ms
  duration: number; // ms
}

// tslint:disable-next-line: no-empty-interface
interface IConnectionFlight extends IBaseFlight {}

export interface IFlight extends IBaseFlight {
  id: number;
  price: number; // usd
  connections: IConnectionFlight[];
}

export interface IStation {
  id: number;
  name: string;
}

export interface ISearchFlightParams {
  destination: number;
  origin: number;
  minPrice: number;
  maxPrice: number;
  connections: number;
  fromDate: number;
  toDate: number;
}
