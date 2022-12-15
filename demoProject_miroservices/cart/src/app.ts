import mongoose from 'mongoose';
import express from 'express';
const app = express();
const port = 3000;
import {router} from './routes/routes';
import {natsWrapper} from './nats-wrapper';
import {natsConnection} from './utils/nats-connection';
import { ProductCreatedListener } from './events/listener/product-created-listener';
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);

mongoose.connect('mongodb://localhost:27017/cart_Service').then(() => {
    console.log('Product service mongobd connected');
}).catch((e) => {
  console.log(e);
});



app.get('/', (req, res) => {
  res.send('Hello World!');

});

const main = async () => {

  await natsWrapper.connect();
  natsConnection.setClient(natsWrapper.client);
  new ProductCreatedListener(natsWrapper.client).listen().then().catch((error) => {
    console.info(error);
});
}

main().then(() => {
  app.listen(port, () => {
      console.info("Listening on port 3000!!!");
  });
}).catch((error) => {
  console.info(error.reason);
});

// app.listen(port, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });