import { Component, OnInit, Input } from '@angular/core';
import {RideService} from '../../services/ride.service';
import Route from '../../../../common/src/Ride/route';

@Component({
  selector: 'app-displaymap',
  templateUrl: './displaymap.component.html',
  styleUrls: ['./displaymap.component.css']
})
export class DisplayMapComponent implements OnInit {
  @Input() id : string
  @Input() requestadd: boolean;
  @Input() requestremove: boolean;
  @Input() driver: boolean;
  //recebe o id da carona e um parametro que decide que tipo de mapa será mostrado

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
  this.id = "1";
  this.rideservice.getRoute(this.id).subscribe(
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
    if(this.driver){
      this.directionsDisplay.setPanel(document.getElementById("dirPanel"))
     }
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
      if(this.driver){
      this.directionsDisplay.setPanel(document.getElementById("dirPanel"))
      }
      if(this.route.stops.length == 0){
      this.directionsDisplay.setRouteIndex(this.route.Index);
      }
    } else {
      alert("deu ruim: " + status);
    }
  });
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

removeStop(){
  console.log(this.stops);
  var a = {location:this.stopholder,stopover:true};
  const stopin = this.stops.findIndex(b => b == a);
  this.stops.splice(stopin,1);
  this.calc();
  this.rideservice.removeStop(a).subscribe();
}

}