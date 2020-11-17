/**export interface IPlace{
    street: string;
    number: number;
}**/

interface IRoute{
    departurePlace: string;
    arrivalPlace: string;
}

export default class Route{
    departurePlace: string;
    arrivalPlace: string;
    stops: google.maps.DirectionsWaypoint[] = [];
    hasFullRoute: boolean = false;
    fullRoute: google.maps.DirectionsResult;

    constructor({departurePlace, arrivalPlace}: IRoute){
        this.departurePlace = departurePlace;
        this.arrivalPlace = arrivalPlace;
    }

    addStop(stop: google.maps.DirectionsWaypoint){
        this.stops.push(stop);
    }

    removeStop(stop: google.maps.DirectionsWaypoint){
        const stopIndex = this.stops.findIndex(s => s == stop);
        this.stops.splice(stopIndex, 1);
    }

   /* setFullRoute(pass){
        this.hasFullRoute = true;
        this.fullRoute = pass;
    }*/
}