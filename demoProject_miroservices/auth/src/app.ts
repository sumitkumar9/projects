import mongoose from 'mongoose';
import express from 'express';
const app = express();
const port = 3002;
import {router} from './routes/routes';
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);
mongoose.connect('mongodb://localhost:27017/auth_Service').then(() => {
    console.log('Product service mongobd connected');
}).catch((e) => {
  console.log(e);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

