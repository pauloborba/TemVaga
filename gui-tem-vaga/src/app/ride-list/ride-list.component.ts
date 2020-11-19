import { Component, Input, OnInit } from '@angular/core';
import Ride from '../../../../common/src/Ride/ride';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css'],
})
export class RideListComponent {
  @Input() rideList: Ride[];
  @Input() showRequests: boolean;
}
