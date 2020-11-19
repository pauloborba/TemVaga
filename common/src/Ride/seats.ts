export default class Seats {
  qttSeats: string;
  passengers: string[];
  requests: string[];

  constructor(seats: string) {
    this.qttSeats = seats;
    this.passengers = [];
    this.requests = [];
  }

  createRequest(cpf: string): string {
    if (Number(this.qttSeats) - this.passengers.length > 0) {
      this.requests.push(cpf);
      return cpf;
    }
    return '';
  }

  rejectRequest(cpf: string): number {
    const userIndex = this.requests.findIndex(c => c === cpf);
    if (userIndex !== -1) this.requests.splice(userIndex, 1);
    return userIndex;
  }

  acceptRequest(cpf: string): number {
    const userIndex = this.requests.findIndex(c => c === cpf);
    if (userIndex !== -1) {
      this.requests.splice(userIndex, 1);
      this.passengers.push(cpf);
    }
    return userIndex;
  }

  cancelPassenger(cpf: string): number {
    const userIndex = this.passengers.findIndex(c => c === cpf);
    if (userIndex !== -1) this.passengers.splice(userIndex, 1);
    return userIndex;
  }
}
