import Ride from '../../common/src/Ride/ride';
import Route from '../../common/src/Ride/route';

export default class RideRegister {
  rides: Ride[] = [];

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

  createRequest(id: string, requesterCpf: string): boolean {
    return;
  }

  cancelRequest(id: string, requesterCpf: string): boolean {
    return;
  }

  acceptRequest(id: string, ownerCpf: string, acceptedCpf: string): boolean {
    return;
  }

  rejectRequest(id: string, ownerCpf: string, rejectedCpf: string): boolean {
    return;
  }

  createRoute(route: Route): Route {
    return;
  }

  updateRoute(route: Route): Route {
    return;
  }
}
