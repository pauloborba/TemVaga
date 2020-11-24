import Ride from '../../../common/src/Ride/ride';
import RideRegister from '../ride.register';
import express = require('express');
import Route from '../../../common/src/Ride/route';

const rideRoutes = express.Router();

const rideRegister: RideRegister = new RideRegister();

rideRoutes.post('/ride', (req: express.Request, res: express.Response) => {
  var ride = <Ride>req.body; 
  rideRegister.register(ride);
  res.send({"success":"batata"});
});

rideRoutes.put('/ride', (req: express.Request, res: express.Response) => {
  // rideRegister.update(ride)
});

rideRoutes.get('/ride/:id', (req: express.Request, res: express.Response) => {
  //rideRegister.getRide(id)
});

rideRoutes.get('/ride/some', (req: express.Request, res: express.Response) => {
  //rideRegister.getRides(id[])
});

rideRoutes.get('/ride/all', (req: express.Request, res: express.Response) => {
  //rideRegister.getllRides()
});

rideRoutes.get(
  '/ride/filtered',
  (req: express.Request, res: express.Response) => {
    // rideRegister.getFilteredRides(ride)
  }
);

rideRoutes.delete(
  '/ride/:id',
  (req: express.Request, res: express.Response) => {
    // rideRegister.delete(id)
  }
);

rideRoutes.put(
  '/ride/request/create/:id',
  (req: express.Request, res: express.Response) => {
    // rideRegister.createRequest(id, requesterCpf)
  }
);

rideRoutes.put(
  '/ride/request/cancel/:id',
  (req: express.Request, res: express.Response) => {
    // rideRegister.cancelRequest(id, requesterCpf)
  }
);

rideRoutes.put(
  '/ride/request/accept/:id',
  (req: express.Request, res: express.Response) => {
    // rideRegister.acceptRequest(id, acceptedCpf)
  }
);

rideRoutes.put(
  '/ride/request/reject/:id',
  (req: express.Request, res: express.Response) => {
    // rideRegister.rejectRequest(id, rejectedCpf)
  }
);

rideRoutes.put(
  '/ride/route/create/:id',
  (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    var route : Route = <Route>req.body;
    rideRegister.createRoute(id,route);
    res.send({"success":"ok"});
  }
);

rideRoutes.get(
  '/ride/route/get/:id',
  (req: express.Request, res: express.Response) => {
    console.log("echoget");
    const { id } = req.params;
    console.log(id);
    res.send(JSON.stringify(rideRegister.getRota(id)));
  }
);

rideRoutes.put(
  '/ride/route/update/:id',
  (req: express.Request, res: express.Response) => {
    //var stop = <google.maps.DirectionsWaypoint>req.body; 
    //rideRegister.updateRoute(stop);
  }
);

rideRoutes.delete(
  '/ride/route/delete/:stop',
  (req: express.Request, res: express.Response) => {
    const {stop} = req.params;
    rideRegister.removeStop(stop);
    res.send({"success":"ok"});
  }
);

rideRoutes.put(
  '/ride/route/stop/:id',
  (req: express.Request, res: express.Response) => {
    var stop = <google.maps.DirectionsWaypoint>req.body;
    const {id} = req.params; 
    console.log(id);
    rideRegister.addStop(id,stop);
    res.send({"success":"ok"});
  }
);

module.exports = rideRoutes;
