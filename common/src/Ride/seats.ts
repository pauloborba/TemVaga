export default class Seats {
  qttPlacesAvailable: number;
  seats: string[] = [];
  requests: string[] = [];

  constructor(places: number) {
    this.qttPlacesAvailable = places;
  }

  makeRequest(cpf: string): void {
    this.requests.push(cpf);
  }

  acceptRequest(cpf: string): void {
    const userIndex = this.requests.findIndex(c => c === cpf);
    if (userIndex === -1) throw new Error();
    this.seats.push(cpf);

    this.requests.splice(userIndex, 1);
    this.qttPlacesAvailable -= 1;
  }

  rejectRequest(cpf: string): void {
    const userIndex = this.requests.findIndex(c => c === cpf);
    if (userIndex === -1) throw new Error();
    this.requests.splice(userIndex, 1);
  }
}
