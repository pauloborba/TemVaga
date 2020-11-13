import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import Car from '../../../common/src/Car/car';

@Injectable()
export class CarService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private baseURL = 'http://localhost:3000/carApi';

  constructor(private http: HttpClient) {}

  create(car: Car): Observable<Car> {
    return;
  }

  update(car: Car): Observable<Car> {
    return;
  }

  getCar(licensePlate: string): Observable<Car> {
    return;
  }

  getCars(licensePlates: string[]): Observable<Car[]> {
    return;
  }

  getAllCars(): Observable<Car[]> {
    return;
  }

  delete(licensePlate: string): Observable<number> {
    return;
  }
}
