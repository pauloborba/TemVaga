import express = require('express');
import bodyParser = require('body-parser');

var tvserver = express();

var allowCrossDomain = function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

tvserver.use(allowCrossDomain);

tvserver.use(bodyParser.json());

tvserver.use('/userApi', require('./src/routes/user.api'));

tvserver.use('/carApi', require('./src/routes/car.api'));

tvserver.use('/rideApi', require('./src/routes/ride.api'));

var server: any = tvserver.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

export { server };
