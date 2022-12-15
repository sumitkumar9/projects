import express from 'express';
import mongoose from 'mongoose';
import {router} from './routes/routes'
import {natsWrapper} from './nats-wrapper';
import {natsConnection} from './utils/nats-connection';
const app = express();
const port = 4000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect('mongodb://localhost:27017/Product_Service').then(() => {
    console.log('Product service mongobd connected');
}).catch((e) => {
  console.log(e);
});
const main = async () => {

  await natsWrapper.connect();
  natsConnection.setClient(natsWrapper.client);
}

main().then(() => {
  app.listen(port, () => {
      console.info("Listening on port 4000!!!");
  });
}).catch((error) => {
  console.info(error);
});

// app.listen(port, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });