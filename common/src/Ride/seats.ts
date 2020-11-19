export default class Seats {
  qttSeatsAvailable: number;
  passengers: string[];
  requests: string[];

  constructor(seats: number) {
    this.qttSeatsAvailable = seats;
    this.passengers = [];
    this.requests = [];
  }

  makeRequest(cpf: string): void {
    this.requests.push(cpf);
  }

  acceptRequest(cpf: string): void {
    const userIndex = this.requests.findIndex(c => c === cpf);
    if (userIndex === -1) throw new Error();
    this.passengers.push(cpf);

    this.requests.splice(userIndex, 1);
    this.qttSeatsAvailable -= 1;
  }

  rejectRequest(cpf: string): void {
    const userIndex = this.requests.findIndex(c => c === cpf);
    if (userIndex === -1) throw new Error();
    this.requests.splice(userIndex, 1);
  }
}
