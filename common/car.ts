export class Car {
  licensePlate: string;
  color: string;
  brand: string;
  model: string;
  carSpots: number;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.licensePlate = '';
    this.color = '';
    this.brand = '';
    this.model = '';
    this.carSpots = 0;
  }

  clone(): Car {
    var car: Car = new Car();
    car.copyFrom(this);
    return car;
  }

  copyFrom(from: Car): void {
    this.licensePlate = from.licensePlate;
    this.color = from.color;
    this.brand = from.brand;
    this.model = from.model;
    this.carSpots = from.carSpots;
  }
}
