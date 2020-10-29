import { IStation, IFlight } from '@airline/model'
import * as dayjs from 'dayjs';

const now = dayjs();

export const STATIONS_DATA: IStation[] = [
  {
    id: 1,
    name: 'Minsk',
  },
  {
    id: 2,
    name: 'Moscow',
  },
  {
    id: 3,
    name: 'Istanbul',
  },
];

export const FLIGHTS_DATA: IFlight[] = [
  {
    id: 1,
    origin: 1,
    destination: 3,
    price: 114.7,
    startAt: now.add(1, 'day').valueOf(),
    endAt: now.add(1, 'day').add(4, 'hour').valueOf(),
    duration: now.add(1, 'day').add(4, 'hour').valueOf() - now.add(1, 'day').valueOf(),
    connections: [],
  },
  {
    id: 2,
    origin: 1,
    destination: 3,
    price: 289.3,
    startAt: now.add(2, 'day').valueOf(),
    endAt: now.add(2, 'day').add(12, 'hour').valueOf(),
    duration: now.add(2, 'day').add(12, 'hour').valueOf() - now.add(2, 'day').valueOf(),
    connections: [
      {
        origin: 1,
        destination: 2,
        startAt: now.add(2, 'day').valueOf(),
        endAt: now.add(2, 'day').add(2, 'hour').valueOf(),
        duration: now.add(2, 'day').add(2, 'hour').valueOf() - now.add(2, 'day').valueOf(),
      },
      {
        origin: 2,
        destination: 3,
        startAt: now.add(2, 'day').add(7, 'hour').valueOf(),
        endAt: now.add(2, 'day').add(12, 'hour').valueOf(),
        duration: now.add(2, 'day').add(12, 'hour').valueOf() - now.add(2, 'day').add(7, 'hour').valueOf(),

      },
    ],
  },
  {
    id: 3,
    origin: 1,
    destination: 2,
    price: 114.7,
    startAt: now.add(2, 'day').valueOf(),
    endAt: now.add(2, 'day').add(2, 'hour').valueOf(),
    duration: now.add(2, 'day').add(2, 'hour').valueOf() - now.add(2, 'day').valueOf(),
    connections: [],
  },
  {
    id: 4,
    origin: 2,
    destination: 3,
    price: 114.7,
    startAt: now.add(2, 'day').add(7, 'hour').valueOf(),
    endAt: now.add(2, 'day').add(12, 'hour').valueOf(),
    duration: now.add(2, 'day').add(12, 'hour').valueOf() - now.add(2, 'day').add(7, 'hour').valueOf(),
    connections: [],
  },
];
