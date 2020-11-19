import { v4 as uuid } from 'uuid';
import User from '../User/user';
import Route from './route';
import Seats from './seats';
import { IPlace } from './route';

interface IRide {
  price: number;
  places: number;
  isPrivate: boolean;
  departureTime: Date;
}

const baseIPlace: IPlace = { street: '', number: 0 };

export default class ride {
  id: string;
  driver: string;
  price: number;
  isPrivate: boolean;
  departureTime: Date;
  route: Route;
  seats: Seats;
  passengers: string[];

  constructor(
    driver: string,
    { price, places, isPrivate, departureTime }: IRide
  ) {
    this.id = uuid();
    this.driver = driver;
    this.price = price;
    this.route = new Route({
      departurePlace: baseIPlace,
      arrivalPlace: baseIPlace,
    });
    this.seats = new Seats(places);
    this.isPrivate = isPrivate;
    this.departureTime = departureTime;
    this.passengers = [];
  }

  changePrivacy() {
    this.isPrivate = !this.isPrivate;
  }
}
