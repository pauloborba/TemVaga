import { v4 as uuid } from 'uuid';
import Route from './route';
import Seats from './seats';

interface IRide {
  departureTime: string;
  price: string;
  isPrivate: string;
  seats: string;
}

export default class Ride {
  id: string;
  driver: string;
  departureTime: string;
  price: string;
  isPrivate: string;
  seats: Seats;
  route: Route;

  constructor(
    driver: string,
    { departureTime, price, isPrivate, seats }: IRide,
    departurePlace: string,
    arrivalPlace: string
  ) {
    this.id = uuid();
    this.driver = driver;
    this.departureTime = departureTime;
    this.price = price;
    this.isPrivate = isPrivate;
    this.seats = new Seats(seats);
    this.route = new Route(departurePlace, arrivalPlace);
  }

  changePrivacy() {
    this.isPrivate === 'Yes'
      ? (this.isPrivate = 'No')
      : (this.isPrivate = 'Yes');
  }

  getDeparturePlace(): string {
    return this.route.getDeparturePlace();
  }

  getArrivalPlace(): string {
    return this.route.getArrivalPlace();
  }

  createRequest(requesterCpf: string): string {
    return this.seats.createRequest(requesterCpf);
  }

  rejectRequest(rejectedCpf: string): number {
    return this.seats.rejectRequest(rejectedCpf);
  }

  acceptRequest(acceptedCpf: string): number {
    return this.seats.acceptRequest(acceptedCpf);
  }

  cancelPassenger(cancelledCpf: string): number {
    return this.seats.cancelPassenger(cancelledCpf);
  }
}
