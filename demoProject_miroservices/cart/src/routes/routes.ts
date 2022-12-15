import express, { Request, Response } from 'express';
import {CartModel} from '../model/cart';
const router = express.Router();


router.post('/cart/addToCart', async (req: Request, res: Response) => {
    const { productId, customerId, quantity } = req.body;
    const obj = {
        productId,
        quantity
    }
    let cart;
    let cartItems = [];
    // const customer = await axios.post("http://localhost:4009/cart/eventUser", {
    //     customerId
    // });
    // if (!Object.keys(customer.data).length) {
    //     return res.send('Customer Not Found');
    // }
    // const product = await axios.post("http://localhost:4009/cart/eventProduct", {
    //     productId
    // });
    // if (!Object.keys(product.data).length) {
    //     return res.status(401).send('Product Not Found');
    // }
    if (quantity) {
        const customerCart: any = await CartModel.findOne({ customerId: customerId });
        if (customerCart) {
            const cartItemsArr = customerCart.cartItems;
            const index = cartItemsArr.findIndex((index) => index.productId == productId);
            if (index >= 0) {
                cartItemsArr[index].quantity += quantity;
                console.log(cartItemsArr);
                cart = await CartModel.findOneAndUpdate({ customerId }, { $set: { cartItems: cartItemsArr } }, { new: true });

            } else {
                cartItemsArr.push(obj);
                cart = await CartModel.findOneAndUpdate({ customerId }, { $set: { cartItems: cartItemsArr } }, { new: true });
            }
        } else {
            cartItems.push(obj);
            cart = await new CartModel({
                customerId,
                cartItems: cartItems
            });
            cart.save();
        }
    }
    return res.status(200).send(cart);
});

router.get('/cart/:customerId/getCart', async (req, res) => {
    const customerId = req.params.customerId;
    const customerCart = await CartModel.findOne({ customerId: customerId });
    res.status(201).send(customerCart);
});

export {router};