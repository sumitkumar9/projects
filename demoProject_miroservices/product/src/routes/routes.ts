import express, { Request, Response } from 'express';
const router = express.Router();
import { Product } from '../models/product'
import { ProductCreatedpublisher } from '../events/publishers/product-created-publisher'
import {natsWrapper} from '../nats-wrapper'
router.get('/products', async (req: Request, res: Response) => {
    const product = await Product.find({});
  
    res.send(product);
});

router.post('/createProduct', async (req: Request, res: Response) => {
  console.log(req.body);
  const { productName, isActive, description, category } = req.body;
  const product = await new Product({
    productName,
    isActive,
    description,
    category
  });
  const createdProduct = await product.save();
  await new ProductCreatedpublisher(natsWrapper.client).publish({
    productId: createdProduct.id,
    productName: createdProduct.productName
    
  });
  res.send(createdProduct);
})

export {router};