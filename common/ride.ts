import {v4 as uuid} from 'uuid';
import Route from './route';
import Seats from './seats';
import Sears from './seats';

interface IRide{
    id: string;
    driverCpf: string;
    price: number;
    isPrivate: boolean;
    departureTime: Date;
    route: Route;
    seats: Seats;
}

export default class ride{
    id: string;
    driverCpf: string;
    price: number;
    isPrivate: boolean;
    departureTime: Date;
    route: Route;
    seats: Seats;

    constructor(driverCpf: string, price: number, isPrivate: boolean, departureTime: Date){
        this.id = uuid();
        this.price = price;
        this.isPrivate = isPrivate;
        this.departureTime = departureTime;
        this.route = new Route();
        this.seats = new Seats(4);
    }

    changePrivacy(){
        this.isPrivate = !this.isPrivate;
    }
}