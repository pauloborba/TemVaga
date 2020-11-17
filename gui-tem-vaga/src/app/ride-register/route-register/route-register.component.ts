import { Component, OnInit, Input } from '@angular/core';
import {RideService} from '../../../services/ride.service';
import Route from '../../../../../common/src/Ride/route';

@Component({
  selector: 'app-route-register',
  templateUrl: './route-register.component.html',
  styleUrls: ['./route-register.component.css']
})
export class RouteRegisterComponent implements OnInit {

  @Input() id: string;

  map: google.maps.Map;
  start: string;
  stops: google.maps.DirectionsWaypoint[] = [];
  dest: string;
  
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({draggable: true});
  
  constructor(private rideservice: RideService) {}
  
  ngOnInit(){
  this.initMap();
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
  this.directionsService.route({
    origin: this.start,
    waypoints: this.stops,
    optimizeWaypoints: true,
    provideRouteAlternatives: true,
    destination: this.dest,
    travelMode: google.maps.TravelMode.DRIVING,
  }, (response, status)  => {
    if (status === google.maps.DirectionsStatus.OK) {
      this.directionsDisplay.setDirections(response);
      this.directionsDisplay.setPanel(document.getElementById("dirPanel"))
    } else {
      alert("deu ruim: " + status);
    }
  });
}

  submit(){
     var r = {id:"1",driver:"p",price:1,isPrivate:false,departureTime:null,route:null,seats:null,passengers:null,changePrivacy(){this.isPrivate = !this.isPrivate;},getRoute(){return this.route;}}
     this.rideservice.create(r).subscribe();    
     var a:Route = new Route({departurePlace: this.start,arrivalPlace: this.dest});
     this.rideservice.createRoute("1",a).subscribe();
  }

}
