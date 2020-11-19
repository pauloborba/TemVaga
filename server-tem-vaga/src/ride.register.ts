import Ride from '../../common/src/Ride/ride';
import Route from '../../common/src/Ride/route';

export default class RideRegister {
  rides: Ride[] = [];

  constructor() {
    var tempRide: Ride = new Ride(
      '048',
      { departureTime: '12:00', price: '3.20', isPrivate: 'No', seats: '2' },
      '',
      ''
    );
    tempRide.seats.requests.push('123');
    tempRide.seats.requests.push('456');
    tempRide.seats.passengers.push('789');
    this.rides = [tempRide];
  }

  register(ride: any): Ride {
    //prettier-ignore
    const {driver, departureTime, price, isPrivate, seats, departurePlace, arrivalPlace} = ride;
    var newRide = new Ride(
      driver,
      { departureTime, price, isPrivate, seats },
      departurePlace,
      arrivalPlace
    );
    this.rides.push(newRide);
    return newRide;
  }

  update(ride: Ride): Ride {
    return;
  }

  getRide(id: string): Ride {
    const result: Ride = this.rides.find(r => r.id === id);
    return result;
  }

  getRides(ids: any): Ride[] {
    var idSet: Set<string>;
    if (typeof ids === 'string') {
      idSet = new Set();
      idSet.add(ids);
    } else {
      idSet = new Set(ids);
    }
    const result: Ride[] = this.rides.filter(r => idSet.has(r.id));
    return result;
  }

  getAllRides(): Ride[] {
    return this.rides;
  }

  getFilteredRides(comparisonRide: Ride): Ride[] {
    return;
  }

  delete(id: string): number {
    const index: number = this.rides.findIndex(r => r.id === id);
    if (index !== -1) this.rides.splice(index, 1);
    return index;
  }

  createRequest(id: string, requesterCpf: string): string {
    const ride: Ride = this.rides.find(r => r.id === id);
    if (ride) {
      return ride.createRequest(requesterCpf);
    }
    return '';
  }

  rejectRequest(id: string, rejectedCpf: string): number {
    const index: number = this.rides.findIndex(r => r.id === id);
    if (index !== -1) {
      return this.rides[index].rejectRequest(rejectedCpf);
    }
    return index;
  }

  acceptRequest(id: string, acceptedCpf: string): number {
    const index: number = this.rides.findIndex(r => r.id === id);
    if (index !== -1) {
      return this.rides[index].acceptRequest(acceptedCpf);
    }
    return index;
  }

  cancelPassenger(id: string, cancelledCpf: string): number {
    const index: number = this.rides.findIndex(r => r.id === id);
    if (index !== -1) {
      return this.rides[index].cancelPassenger(cancelledCpf);
    }
    return index;
  }

  createRoute(route: Route): Route {
    return;
  }

  updateRoute(route: Route): Route {
    return;
  }
}
