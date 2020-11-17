import User from '../../../common/src/User/user';
import UserRegister from '../user.register';
import { Request, Response, Router } from 'express';

const userRoutes = Router();

const userRegister: UserRegister = new UserRegister();

userRoutes.post('/user', (req: Request, res: Response) => {
  // userRegister.register(user);
});

userRoutes.put('/user', (req: Request, res: Response) => {
  // userRegister.update(user)
});

userRoutes.get('/user/:cpf', (req: Request, res: Response) => {
  //userRegister.getUser(cpf)
});

userRoutes.get('/user/some', (req: Request, res: Response) => {
  //userRegister.getUsers(cpf[])
});

userRoutes.get('/user/all', (req: Request, res: Response) => {
  //userRegister.getAllUsers()
});

userRoutes.delete(
  '/user/:cpf',
  (req: Request, res: Response) => {
    // userRegister.delete(cpf)
  }
);

userRoutes.put('/user/:cpf', (req: Request, res: Response) => {
  // userRegister.evaluateUser(cpfToEvaluate, evaluationValue)
});

module.exports = userRoutes;
