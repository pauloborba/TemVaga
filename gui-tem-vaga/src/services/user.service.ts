import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import User from '../../../common/src/User/user';

@Injectable()
export class UserService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private baseURL = 'http://localhost:3000/userApi';

  private isLoggedInSubj = new BehaviorSubject(false);
  isLoggedIn = this.isLoggedInSubj.asObservable();

  private loggedUserSubj = new BehaviorSubject(null);
  loggedUser = this.loggedUserSubj.asObservable();

  constructor(private http: HttpClient) {}

  login(user: User): void {
    this.isLoggedInSubj.next(true);
    this.setNextUser(user);
  }

  logout(): void {
    this.isLoggedInSubj.next(false);
    this.setNextUser(null);
  }

  setNextUser(user: User) {
    this.loggedUserSubj.next(user);
  }

  create(user: User): Observable<User> {
    return this.http
      .post<any>(`${this.baseURL}/user`, user, { headers: this.headers })
      .pipe(
        retry(2),
        map((res) => {
          if (res.success) return JSON.parse(res.user);
          return null;
        })
      );
  }

  update(user: User): Observable<User> {
    return;
  }

  getUser(cpf: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/user/${cpf}`).pipe(retry(2));
  }

  getUserByLogin(email: string, password: string): Observable<User> {
    return this.http
      .get<User>(`${this.baseURL}/user/login`, {
        params: { email: email, password: password },
      })
      .pipe(retry(2));
  }

  getUsers(cpfs: string[]): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseURL}/user/some`, {
        params: { cpfs: cpfs },
      })
      .pipe(retry(2));
  }

  getAllUsers(): Observable<User[]> {
    return;
  }

  delete(cpf: string): Observable<number> {
    return;
  }

  insertRegisteredRide(driverCpf: string, rideId: string): Observable<User> {
    return this.http
      .put<any>(
        `${this.baseURL}/user/registerRide/insert/${driverCpf}`,
        { rideId: rideId },
        {
          headers: this.headers,
        }
      )
      .pipe(
        retry(2),
        map((res) => {
          if (res.success) {
            this.setNextUser(JSON.parse(res.user));
          } else {
            return null;
          }
        })
      );
  }

  removeRegisteredRide(driverCpf: string, rideId: string): Observable<User> {
    return this.http
      .put<any>(
        `${this.baseURL}/user/registerRide/remove/${driverCpf}`,
        { rideId: rideId },
        {
          headers: this.headers,
        }
      )
      .pipe(
        retry(2),
        map((res) => {
          if (res.success) {
            return JSON.parse(res.user);
          } else {
            return null;
          }
        })
      );
  }

  insertRequestedRide(userCpf: string, rideId: string): Observable<User> {
    return this.http
      .put<any>(
        `${this.baseURL}/user/requestRide/insert/${userCpf}`,
        { rideId: rideId },
        {
          headers: this.headers,
        }
      )
      .pipe(
        retry(2),
        map((res) => {
          if (res.success) {
            this.setNextUser(JSON.parse(res.user));
          } else {
            return null;
          }
        })
      );
  }

  removeRequestedRide(userCpf: string, rideId: string): Observable<User> {
    return this.http
      .put<any>(
        `${this.baseURL}/user/requestRide/remove/${userCpf}`,
        { rideId: rideId },
        {
          headers: this.headers,
        }
      )
      .pipe(
        retry(2),
        map((res) => {
          if (res.success) {
            return JSON.parse(res.user);
          } else {
            return null;
          }
        })
      );
  }

  evaluateUser(
    cpfToEvaluate: string,
    evaluationValue: number
  ): Observable<number> {
    return;
  }
}
