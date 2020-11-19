import Ride from '../../common/src/Ride/ride';
import Route from '../../common/src/Ride/route';

export default class RideRegister {
  rides: Ride[] = [];

  register(ride: Ride): Ride {
    this.rides.push(ride);
    return;
  }

  idNotRegistered(id: string): boolean {
    return;
  }

  update(ride: Ride): Ride {
    return;
  }

  getRide(id: string): Ride {
    return;
  }

  getRides(ids: string[]): Ride[] {
    return;
  }

  getAllRides(): Ride[] {
    return this.rides;
  }

  getFilteredRides(comparisonRide: Ride): Ride[] {
    return;
  }

  delete(id: string): number {
    return;
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

  createRoute(id: string, route: Route): Route {
    var index =this.rides.findIndex(a => a.id == id);
    this.rides[index].route = route;
    console.log("feito");
    return;
  }

  getRota(id:string): Route{
    console.log(id);
    var b = this.rides.findIndex(a => a.id == id);
    console.log(b);
    return this.rides[b].route;
  }

  updateRoute(stop: google.maps.DirectionsWaypoint): Route {
    return;
  }

  addStop(id:string,stop:google.maps.DirectionsWaypoint):google.maps.DirectionsWaypoint{
    var b = this.rides.findIndex(a => a.id == id);
    this.rides[b].route.stops.push(stop);
    return;
  }

  removeStop(stop:string):google.maps.DirectionsWaypoint{
    //var ridein = this.rides.findIndex(a => a.id == id);
    const stopin = this.rides[0].route.stops.findIndex(s => s.location == stop);
    this.rides[0].route.stops.splice(stopin, 1);
    return;
  }
}
