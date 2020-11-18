import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import Ride from '../../../common/src/Ride/ride';
import Route from '../../../common/src/Ride/route';

@Injectable()
export class RideService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private baseURL = 'http://localhost:3000/rideApi';
  private rides: Ride[] = [{id:"1",driver:"p",price:1,isPrivate:false,departureTime:null,route:null,seats:null,passengers:null,changePrivacy(){this.isPrivate = !this.isPrivate;},getRoute(){return this.route;}}];

  constructor(private http: HttpClient) {}

  create(ride: Ride): Observable<Ride> {
    return this.http.post<any>(this.baseURL + "/ride", ride, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return ride;} else {return null;}} )
              ); 
  }

  update(ride: Ride): Observable<Ride> {
    return;
  }

  getRide(id: string): Observable<Ride> {
    return;
  }

  getRides(ids: string[]): Observable<Ride[]> {
    return;
  }

  getAllRides(): Observable<Ride[]> {
    return;
  }

  getFilteredRides(comparisonRide: Ride): Observable<Ride[]> {
    return;
  }

  delete(id: string): Observable<number> {
    return;
  }

  createRequest(id: string, requesterCpf: string): Observable<boolean> {
    return;
  }

  cancelRequest(id: string, requesterCpf: string): Observable<boolean> {
    return;
  }

  acceptRequest(
    id: string,
    ownerCpf: string,
    acceptedCpf: string
  ): Observable<boolean> {
    return;
  }

  rejectRequest(
    id: string,
    ownerCpf: string,
    rejectedCpf: string
  ): Observable<boolean> {
    return;
  }

  createRoute(id:string,route: Route): Observable<Route> {
    //this.rides[index].route = route;
    return this.http.put<any>(this.baseURL + "/ride/route/create/" + id, JSON.stringify(route), {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return route;} else {return null;}} )
              ); 
  }

  updateRoute(route: Route): Observable<Route> {
    return;
  }

  getRoute(id:string): Observable<Route>{
    return this.http.get<any>(this.baseURL + "/ride/route/get/" + id)
    .pipe(
       retry(2)
     );
  }

  addStop(id:string,stop: google.maps.DirectionsWaypoint){
    //this.rides[index].route.addStop(stop);
    return this.http.put<any>(`${this.baseURL}/ride/route/stop/${id}`, JSON.stringify(stop), {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return stop;} else {return null;}} )
              ); 
  }

  removeStop(stop:google.maps.DirectionsWaypoint){
    return this.http.delete(this.baseURL + "/ride/route/delete/"+ stop, {headers: this.headers})
    .pipe(
      retry(2)
    );
  }
}
