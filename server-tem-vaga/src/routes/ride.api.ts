import Ride from '../../../common/src/Ride/ride';
import RideRegister from '../ride.register';
import { Request, Response, Router } from 'express';

const rideRoutes = Router();

const rideRegister: RideRegister = new RideRegister();

rideRoutes.get('/ride/some', (req: Request, res: Response) => {
  // prettier-ignore
  res.send(JSON.stringify(rideRegister.getRides(req.query.ids)));
});

rideRoutes.get('/ride/all', (req: Request, res: Response) => {
  res.send(JSON.stringify(rideRegister.getAllRides()));
});

rideRoutes.get('/ride/filtered', (req: Request, res: Response) => {
  // rideRegister.getFilteredRides(ride)
});

rideRoutes.get('/ride/:id', (req: Request, res: Response) => {
  const ride: Ride = rideRegister.getRide(req.params.id);
  res.send(JSON.stringify(ride));
});

rideRoutes.post('/ride', (req: Request, res: Response) => {
  const ride = rideRegister.register(<Ride>req.body);
  if (ride) {
    res.send({
      success: 'The ride was registered successfully!',
      ride: JSON.stringify(ride),
    });
  } else {
    res.send({ failure: 'Something went wrong on ride registration' });
  }
});

rideRoutes.delete('/ride/:id', (req: Request, res: Response) => {
  // rideRegister.delete(id)
});

rideRoutes.put('/ride/request/create/:id', (req: Request, res: Response) => {
  const createdCpf: string = rideRegister.createRequest(
    req.params.id,
    req.body.requesterCpf
  );
  console.log(createdCpf);
  if (createdCpf !== '') {
    res.send({
      success: 'The request was created successfully!',
      requesterCpf: createdCpf,
    });
  } else {
    res.send({
      failure: 'Could not find ride or request.',
    });
  }
});

rideRoutes.put('/ride/request/reject/:id', (req: Request, res: Response) => {
  const requestIndex: number = rideRegister.rejectRequest(
    req.params.id,
    req.body.rejectedCpf
  );
  if (requestIndex !== -1) {
    res.send({
      success: 'The request was rejected successfully!',
      requestIndex: requestIndex,
    });
  } else {
    res.send({
      failure: 'Could not find ride or request.',
    });
  }
});

rideRoutes.put('/ride/request/accept/:id', (req: Request, res: Response) => {
  const requestIndex: number = rideRegister.acceptRequest(
    req.params.id,
    req.body.acceptedCpf
  );
  if (requestIndex !== -1) {
    res.send({
      success: 'The request was accepted successfully!',
      requestIndex: requestIndex,
    });
  } else {
    res.send({
      failure: 'Could not find ride or request.',
    });
  }
});

rideRoutes.put('/ride/passenger/cancel/:id', (req: Request, res: Response) => {
  const passengerIndex: number = rideRegister.cancelPassenger(
    req.params.id,
    req.body.cancelledCpf
  );
  if (passengerIndex !== -1) {
    res.send({
      success: 'The passenger was cancelled successfully!',
      passengerIndex: passengerIndex,
    });
  } else {
    res.send({
      failure: 'Could not find ride or passenger.',
    });
  }
});

rideRoutes.put('/ride/route/create/:id', (req: Request, res: Response) => {
  // rideRegister.createRoute(Route)
});

rideRoutes.put('/ride/route/update/:id', (req: Request, res: Response) => {
  // rideRegister.updateRoute(Route)
});

rideRoutes.put('/ride', (req: Request, res: Response) => {
  // rideRegister.update(ride)
});

module.exports = rideRoutes;
