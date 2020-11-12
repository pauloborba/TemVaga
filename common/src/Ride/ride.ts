import {v4 as uuid} from 'uuid';
import User from '../User/user';
import Route from './route';
import Seats from './seats';

interface IRide{
    price: number;
    places: number;
    isPrivate: boolean;
    departureTime: Date;
}

export default class ride{
    id: string;
    driver: User;
    price: number;
    isPrivate: boolean;
    departureTime: Date;
    route: Route;
    seats: Seats;

    constructor(driver: User, {price, places, isPrivate, departureTime}: IRide){
        this.id = uuid();
        this.driver = driver.clone();
        this.price = price;
        this.route = new Route();
        this.seats = new Seats(places);
        this.isPrivate = isPrivate;
        this.departureTime = departureTime;
    }

    changePrivacy(){
        this.isPrivate = !this.isPrivate;
    }
}