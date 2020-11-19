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

  constructor(private http: HttpClient) {}
  // prettier-ignore
  create(ride): Observable<Ride> {
    return (this.http
      .post<any>(`${this.baseURL}/ride`, ride, { headers: this.headers })
      .pipe(retry(2), map((res) => {
          if (res.success) return JSON.parse(res.ride);
          return null;
        })
      )
    );
  }

  update(ride: Ride): Observable<Ride> {
    return;
  }

  getRide(id: string): Observable<Ride> {
    return this.http.get<Ride>(`${this.baseURL}/ride/${id}`).pipe(retry(2));
  }

  getRides(ids: string[]): Observable<Ride[]> {
    return this.http
      .get<Ride[]>(`${this.baseURL}/ride/some`, {
        params: { ids: ids },
      })
      .pipe(retry(2));
  }

  getAllRides(): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.baseURL}/ride/all`).pipe(retry(2));
  }

  getFilteredRides(comparisonRide: Ride): Observable<Ride[]> {
    return;
  }

  delete(id: string): Observable<number> {
    return;
  }

  createRequest(id: string, requesterCpf: string): Observable<string> {
    return this.http
      .put<any>(
        `${this.baseURL}/ride/request/create/${id}`,
        { requesterCpf: requesterCpf },
        {
          headers: this.headers,
        }
      )
      .pipe(
        retry(2),
        map((res) => {
          if (res.success) {
          } else {
            return '';
          }
        })
      );
  }

  rejectRequest(id: string, rejectedCpf: string): Observable<number> {
    return this.http
      .put<any>(
        `${this.baseURL}/ride/request/reject/${id}`,
        { rejectedCpf: rejectedCpf },
        {
          headers: this.headers,
        }
      )
      .pipe(
        retry(2),
        map((res) => {
          if (res.success) {
            return res.requestIndex;
          } else {
            return '';
          }
        })
      );
  }

  acceptRequest(id: string, acceptedCpf: string): Observable<number> {
    return this.http
      .put<any>(
        `${this.baseURL}/ride/request/accept/${id}`,
        { acceptedCpf: acceptedCpf },
        {
          headers: this.headers,
        }
      )
      .pipe(
        retry(2),
        map((res) => {
          if (res.success) {
            return res.requestIndex;
          } else {
            return '';
          }
        })
      );
  }

  cancelPassenger(id: string, cancelledCpf: string): Observable<number> {
    return this.http
      .put<any>(
        `${this.baseURL}/ride/passenger/cancel/${id}`,
        { cancelledCpf: cancelledCpf },
        {
          headers: this.headers,
        }
      )
      .pipe(
        retry(2),
        map((res) => {
          if (res.success) {
            return res.passengerIndex;
          } else {
            return '';
          }
        })
      );
  }

  createRoute(route: Route): Observable<Route> {
    return;
  }

  updateRoute(route: Route): Observable<Route> {
    return;
  }
}
