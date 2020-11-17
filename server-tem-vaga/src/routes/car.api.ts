import Car from '../../../common/src/Car/car';
import CarRegister from '../car.register';
import { Request, Response, Router } from 'express';

const carRoutes = Router();

const carRegister: CarRegister = new CarRegister();

carRoutes.post('/car', (req: Request, res: Response) => {
  // carRegister.register(car);
});

carRoutes.put('/car', (req: Request, res: Response) => {
  // carRegister.update(car)
});

carRoutes.get(
  '/car/:licensePlate',
  (req: Request, res: Response) => {
    //carRegister.getCar(licensePlate)
  }
);

carRoutes.get('/car/some', (req: Request, res: Response) => {
  //carRegister.getCars(licensePlate[])
});

carRoutes.get('/car/all', (req: Request, res: Response) => {
  //carRegister.getAllCars()
});

carRoutes.delete(
  '/car/:licensePlate',
  (req: Request, res: Response) => {
    // carRegister.delete(licensePlate)
  }
);

module.exports = carRoutes;
