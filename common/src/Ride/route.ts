interface IPlace{
    street: string;
    number: number;
}

interface IRoute{
    departurePlace: IPlace;
    arrivalPlace: IPlace;
}

export default class Route{
    departurePlace: IPlace;
    arrivalPlace: IPlace;
    stops: IPlace[];

    constructor({departurePlace, arrivalPlace}: IRoute){
        this.departurePlace = departurePlace;
        this.arrivalPlace = arrivalPlace;
    }

    addStop(stop: IPlace){
        this.stops.push(stop);
    }

    removeStop(stop: IPlace){
        const stopIndex = this.stops.findIndex(s => s == stop);
        this.stops.splice(stopIndex, 1);
    }
}