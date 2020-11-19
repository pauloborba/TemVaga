import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RideService } from 'src/services/ride.service';
import { UserService } from 'src/services/user.service';
import Ride from '../../../../../common/src/Ride/ride';
import User from '../../../../../common/src/User/user';

@Component({
  selector: 'app-request-ride',
  templateUrl: './request-ride.component.html',
  styleUrls: ['./request-ride.component.css'],
})
export class RequestRideComponent implements OnInit {
  requesterCpf: string;
  rideId: string;
  ride: Ride;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rideService: RideService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.loggedUser.subscribe((loggedUser) => {
      if (loggedUser) this.requesterCpf = loggedUser.cpf;
    });
    this.rideId = this.route.snapshot.paramMap.get('id');
    this.getRide(this.rideId);
  }

  onReturn(): void {
    this.router.navigate(['/available-rides']);
  }

  onRequest(): void {
    this.createRequest(this.requesterCpf);
    this.onReturn();
  }

  getRide(rideId: string): void {
    this.rideService.getRide(rideId).subscribe((ride) => {
      if (ride) {
        this.ride = ride;
      }
    });
  }

  createRequest(requesterCpf: string) {
    console.log(this.rideId);
    this.userService.insertRequestedRide(requesterCpf, this.rideId).subscribe();
    this.rideService.createRequest(this.rideId, requesterCpf).subscribe();
  }
}
