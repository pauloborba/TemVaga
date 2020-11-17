import { Component, OnInit, Input } from '@angular/core';
import {RideService} from '../../services/ride.service';
import Route from '../../../../common/src/Ride/route';

@Component({
  selector: 'app-displaymap',
  templateUrl: './displaymap.component.html',
  styleUrls: ['./displaymap.component.css']
})
export class DisplayMapComponent implements OnInit {
  @Input() requestadd: boolean;
  @Input() requestremove: boolean;
  @Input() driver: boolean;

  map: google.maps.Map;
  start: string;
  stops: google.maps.DirectionsWaypoint[] = [];
  dest: string;
  route: Route;
  stopholder: string;
  
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({draggable: true});
  
  constructor(private rideservice : RideService) {}
  
  ngOnInit(){
  this.initMap();
  this.rideservice.getRoute("1").subscribe(
    ar => {
      if(ar){
        this.route = ar;
        this.start = this.route.departurePlace;
        this.dest =  this.route.arrivalPlace;
        this.stops = this.route.stops;
        this.calc();
      }
    }

  );
  }
  
  initMap(){
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -8.05, lng: -34.900002 },
    zoom: 13,
    disableDefaultUI: true,
    zoomControl: true
  });
  
  this.directionsDisplay.setMap(this.map);
  }
  
  calc(){
  //this.stops.push({
 //   location: "Rua Barão de Granito",
 //   stopover: true,
 //});
  console.log(this.driver);
  if(this.route.hasFullRoute){
    this.directionsDisplay.setDirections(this.route.fullRoute);
    if(this.driver){
      this.directionsDisplay.setPanel(document.getElementById("dirPanel"))
     }
  }else{
  this.directionsService.route({
    origin: this.start,
    waypoints: this.stops,
    optimizeWaypoints: true,
    destination: this.dest,
    travelMode: google.maps.TravelMode.DRIVING,
  }, (response, status)  => {
    if (status === google.maps.DirectionsStatus.OK) {
      this.directionsDisplay.setDirections(response);
      if(this.driver){
      this.directionsDisplay.setPanel(document.getElementById("dirPanel"))
      }
    } else {
      alert("deu ruim: " + status);
    }
  });
}
}

setdriver(){
  this.driver= true
  this.calc();
}

addStop(){
  console.log(this.stops);
  var a = {location:this.stopholder,stopover:true};
  this.stops.push(a);
  this.calc();
  this.rideservice.addStop("1",a).subscribe();
}

}
