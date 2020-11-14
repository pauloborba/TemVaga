import Car from '../../common/src/Car/car';

export default class CarRegister {
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

  getCar(licensePlate: string): Car {
    var result: Car = this.cars.find(u => u.licensePlate == licensePlate);
    return result;
  }

  //TODO: Implement getCars
  getCars(licensePlates: string[]): Car[] {
    return;
  }

  getAllCars(): Car[] {
    return this.cars;
  }

  delete(licensePlate: string): number {
    var index: number = this.cars.findIndex(
      c => c.licensePlate == licensePlate
    );
    if (index === -1) this.cars.splice(index, 1);
    return index;
  }
}
