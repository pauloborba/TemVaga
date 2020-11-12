import User from '../User/user';

export default class Seats{
    qttPlacesAvailable: number;
    seats: User[] = [];
    requests: User[] = [];

    constructor(places: number){
        this.qttPlacesAvailable = places;
    }

    makeRequest(user: User): void{
        this.requests.push(user);
    }

    acceptRequest(user: User): void{
        const userIndex = this.requests.findIndex(u => u.cpf === user.cpf);
        if(userIndex === -1) throw new Error();

        this.seats.push(user);

        this.requests.splice(userIndex, 1);
        this.qttPlacesAvailable -= 1;
    }

    rejectRequest(user: User): void{
        const userIndex = this.requests.findIndex(u => u.cpf === user.cpf);
        if(userIndex === -1) throw new Error();
        this.requests.splice(userIndex, 1);
    }
}