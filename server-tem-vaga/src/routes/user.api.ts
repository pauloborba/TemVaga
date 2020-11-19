import User from '../../../common/src/User/user';
import UserRegister from '../user.register';
import { Request, Response, Router } from 'express';

const userRoutes = Router();

const userRegister: UserRegister = new UserRegister();

userRoutes.get('/user/some', (req: Request, res: Response) => {
  res.send(JSON.stringify(userRegister.getUsers(req.query.cpfs)));
});

userRoutes.get('/user/all', (req: Request, res: Response) => {
  res.send(JSON.stringify(userRegister.getAllUsers()));
});

userRoutes.get('/user/login', (req: Request, res: Response) => {
  const { email, password } = req.query;
  const user: User = userRegister.getUserByLogin(email, password);
  res.send(JSON.stringify(user));
});

userRoutes.get('/user/:cpf', (req: Request, res: Response) => {
  const user: User = userRegister.getUser(req.params.cpf);
  res.send(JSON.stringify(user));
});

userRoutes.post('/user', (req: Request, res: Response) => {
  const user: User = userRegister.register(<User>req.body);
  if (user) {
    res.send({
      success: 'The user was registered successfully!',
      user: JSON.stringify(user),
    });
  } else {
    res.send({ failure: 'Something went wrong on user registration' });
  }
});

userRoutes.delete('/user/:cpf', (req: Request, res: Response) => {
  // userRegister.delete(cpf)
});

userRoutes.put('/user', (req: Request, res: Response) => {
  // userRegister.update(user)
});

userRoutes.put(
  '/user/registerRide/insert/:cpf',
  (req: Request, res: Response) => {
    const user = userRegister.insertRegisteredRide(
      req.params.cpf,
      req.body.rideId
    );
    if (user) {
      res.send({
        success: 'The registered ride was inserted successfully!',
        user: JSON.stringify(user),
      });
    } else {
      res.send({
        failure: 'Something went wrong on registered ride insertion',
      });
    }
  }
);

userRoutes.put(
  '/user/registerRide/remove/:cpf',
  (req: Request, res: Response) => {
    const user = userRegister.removeRegisteredRide(
      req.params.cpf,
      req.body.rideId
    );
    if (user) {
      res.send({
        success: 'The registered ride was removed successfully!',
        user: JSON.stringify(user),
      });
    } else {
      res.send({ failure: 'Something went wrong on registered ride removal' });
    }
  }
);

userRoutes.put(
  '/user/requestRide/insert/:cpf',
  (req: Request, res: Response) => {
    const user = userRegister.insertRequestedRide(
      req.params.cpf,
      req.body.rideId
    );
    if (user) {
      res.send({
        success: 'The requested ride was inserted successfully!',
        user: JSON.stringify(user),
      });
    } else {
      res.send({ failure: 'Something went wrong on ride insertion' });
    }
  }
);

userRoutes.put(
  '/user/requestRide/remove/:cpf',
  (req: Request, res: Response) => {
    const user = userRegister.removeRequestedRide(
      req.params.cpf,
      req.body.rideId
    );
    if (user) {
      res.send({
        success: 'The requested ride was removed successfully!',
        user: JSON.stringify(user),
      });
    } else {
      res.send({ failure: 'Something went wrong on requested ride removal' });
    }
  }
);

userRoutes.put('/user/:cpf', (req: Request, res: Response) => {
  // userRegister.evaluateUser(cpfToEvaluate, evaluationValue)
});

module.exports = userRoutes;
