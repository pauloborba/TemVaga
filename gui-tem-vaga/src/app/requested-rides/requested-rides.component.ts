import { Component, OnInit } from '@angular/core';
import { RideService } from 'src/services/ride.service';
import { UserService } from 'src/services/user.service';
import Ride from '../../../../common/src/Ride/ride';
import User from '../../../../common/src/User/user';

@Component({
  selector: 'app-requested-rides',
  templateUrl: './requested-rides.component.html',
  styleUrls: ['./requested-rides.component.css'],
})
export class RequestedRidesComponent implements OnInit {
  isLoggedIn: boolean;
  loggedUser: User;
  requestedRides: Ride[] = [];

  constructor(
    private rideService: RideService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((value) => (this.isLoggedIn = value));
    this.userService.loggedUser.subscribe((user) => {
      this.loggedUser = user;
      if (user) {
        this.rideService.getRides(user.requestedRides).subscribe(
          (requestedRides) => {
            this.requestedRides = requestedRides;
          },
          (msg) => {
            alert(msg.message);
          }
        );
      } else {
        this.requestedRides = [];
      }
    });
  }
}
