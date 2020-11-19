import { Component, Input, OnInit } from '@angular/core';
import Ride from '../../../../common/src/Ride/ride';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css'],
})
export class RideComponent {
  @Input() isMyRides: boolean = false;
  @Input() isAvailableRides: boolean = false;
  @Input() rideInfo: Ride;
  @Input() showRequests: boolean;
}
