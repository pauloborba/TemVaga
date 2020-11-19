import { Component, OnInit } from '@angular/core';
import { RideService } from 'src/services/ride.service';
import Ride from '../../../../common/src/Ride/ride';

@Component({
  selector: 'app-available-rides',
  templateUrl: './available-rides.component.html',
  styleUrls: ['./available-rides.component.css'],
})
export class AvailableRidesComponent implements OnInit {
  availableRides: Ride[];

  constructor(private rideService: RideService) {}

  ngOnInit(): void {
    this.rideService.getAllRides().subscribe(
      (allRides) => {
        this.availableRides = allRides;
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }
}
