import Car from '../../common/car';

export class CarRegister {
  cars: Car[] = [];

  register(car: Car): Car {
    var result = null;
    if (this.licenseNotRegistered(car.licensePlate)) {
      result = new Car();
      result.copyFrom(car);
      this.cars.push(result);
    }
    return result;
  }

  licenseNotRegistered(licensePlate: string): boolean {
    return !this.cars.find(c => c.licensePlate == licensePlate);
  }

  update(car: Car): Car {
    var result: Car = this.cars.find(c => c.licensePlate == car.licensePlate);
    if (result) result.copyFrom(car);
    return result;
  }

  getCars(): Car[] {
    return this.cars;
  }

  delete(licensePlate: string): boolean {
    var position: number = this.cars.findIndex(
      c => c.licensePlate == licensePlate
    );
    if (position === -1) false;
    this.cars.splice(position, 1);
    return true;
  }
}
