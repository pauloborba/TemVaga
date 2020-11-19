import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RideService } from 'src/services/ride.service';
import { UserService } from 'src/services/user.service';
import User from '../../../../../common/src/User/user';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  qttSeats: string;
  passengers: User[];
  requests: User[];
  rideId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rideService: RideService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      if (!isLoggedIn) this.onReturn();
    });
    this.rideId = this.route.snapshot.paramMap.get('id');
    this.getRide(this.rideId);
  }

  onReturn(): void {
    this.router.navigate(['/my-rides']);
  }

  getRide(rideId: string): void {
    this.rideService.getRide(rideId).subscribe((ride) => {
      if (ride) {
        this.getRequests(ride.seats);
        this.getPassengers(ride.seats);
        this.qttSeats = ride.seats.qttSeats;
      }
    });
  }

  getPassengers({ passengers }: { passengers: string[] }): void {
    this.userService.getUsers(passengers).subscribe((users) => {
      if (users) {
        this.passengers = users;
      }
    });
  }

  getRequests({ requests }: { requests: string[] }): void {
    this.userService.getUsers(requests).subscribe((users) => {
      if (users) {
        console.log(users);
        this.requests = users;
      }
    });
  }

  onRejectRequest(rejectedCpf): void {
    this.rideService
      .rejectRequest(this.rideId, rejectedCpf)
      .subscribe((index) => {
        if (index !== -1) {
          this.requests.splice(index, 1);
          this.userService
            .removeRequestedRide(rejectedCpf, this.rideId)
            .subscribe();
        }
      });
  }

  onAcceptRequest(acceptedCpf): void {
    this.rideService
      .acceptRequest(this.rideId, acceptedCpf)
      .subscribe((index) => {
        if (index !== -1) {
          this.passengers.push(this.requests[index]);
          this.requests.splice(index, 1);
        }
      });
  }

  onCancelPassenger(cancelledCpf): void {
    this.rideService
      .cancelPassenger(this.rideId, cancelledCpf)
      .subscribe((index) => {
        if (index !== -1) {
          this.passengers.splice(index, 1);
          this.userService
            .removeRequestedRide(cancelledCpf, this.rideId)
            .subscribe();
        }
      });
  }
}
