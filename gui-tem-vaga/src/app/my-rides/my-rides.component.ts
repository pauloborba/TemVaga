import { Component, OnInit } from '@angular/core';
import { RideService } from '../../services/ride.service';
import { UserService } from '../../services/user.service';
import Ride from '../../../../common/src/Ride/ride';
import User from '../../../../common/src/User/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.css'],
})
export class MyRidesComponent implements OnInit {
  registerFailed: boolean = false;
  registerSuccessful: boolean = false;
  toLogin: boolean = false;
  toRegisterCar: boolean = false;
  isRegisteringRide: boolean = false;
  isLoggedIn: boolean;
  loggedUser: User;
  myRides: Ride[] = [];

  constructor(
    private rideService: RideService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((value) => (this.isLoggedIn = value));
    this.userService.loggedUser.subscribe((user) => {
      this.loggedUser = user;
      if (user) {
        this.rideService.getRides(user.registeredRides).subscribe(
          (myRides) => {
            console.log(myRides);
            this.myRides = myRides;
          },
          (msg) => {
            alert(msg.message);
          }
        );
      } else {
        this.myRides = [];
      }
    });
  }

  onRegister(): void {
    if (this.loggedUser) {
      if (this.loggedUser.carLicensePlate !== '') this.isRegisteringRide = true;
      else this.toRegisterCar = true;
    } else {
      this.toLogin = true;
    }
  }

  onStopRegister(): void {
    this.isRegisteringRide = false;
  }

  closeRegisterCarMessage(): void {
    this.toRegisterCar = false;
    this.router.navigate(['/my-profile']);
  }

  closeLoginMessage(): void {
    this.toLogin = false;
    this.router.navigate(['/my-profile']);
  }

  closeConfirmationMessage(): void {
    this.registerSuccessful = false;
  }

  showConfirmationMessage(): void {
    this.registerSuccessful = true;
  }

  closeFailureMessage(): void {
    this.registerFailed = false;
  }

  showFailureMessage(): void {
    this.registerFailed = true;
  }

  onFinishRegister({ registeredRideId }): void {
    // this.myRides.push(registeredRide);
    this.onStopRegister();
    if (registeredRideId !== '') {
      this.insertRegisteredRide(registeredRideId);
      this.showConfirmationMessage();
    } else {
      this.showFailureMessage();
    }
  }

  insertRegisteredRide(registeredRideId: string) {
    console.log(registeredRideId);
    if (this.loggedUser) {
      this.userService
        .insertRegisteredRide(this.loggedUser.cpf, registeredRideId)
        .subscribe(
          (ride) => {},
          (msg) => {
            alert(msg.message);
          }
        );
    } else {
      console.log('No user is logged in.');
    }
  }
}
