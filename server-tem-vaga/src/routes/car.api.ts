import Car from '../../../common/src/Car/car';
import CarRegister from '../car.register';
import express = require('express');

const carRoutes = express.Router();

const carRegister: CarRegister = new CarRegister();

carRoutes.post('/car', (req: express.Request, res: express.Response) => {
  // carRegister.register(car);
});

carRoutes.put('/car', (req: express.Request, res: express.Response) => {
  // carRegister.update(car)
});

carRoutes.get(
  '/car/:licensePlate',
  (req: express.Request, res: express.Response) => {
    //carRegister.getCar(licensePlate)
  }
);

carRoutes.get('/car/some', (req: express.Request, res: express.Response) => {
  //carRegister.getCars(licensePlate[])
});

carRoutes.get('/car/all', (req: express.Request, res: express.Response) => {
  //carRegister.getAllCars()
});

carRoutes.delete(
  '/car/:licensePlate',
  (req: express.Request, res: express.Response) => {
    // carRegister.delete(licensePlate)
  }
);

module.exports = carRoutes;
