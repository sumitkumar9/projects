"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const cart_1 = require("../model/cart");
const router = express_1.default.Router();
exports.router = router;
router.post('/cart/addToCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, customerId, quantity } = req.body;
    const obj = {
        productId,
        quantity
    };
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
        const customerCart = yield cart_1.CartModel.findOne({ customerId: customerId });
        if (customerCart) {
            const cartItemsArr = customerCart.cartItems;
            const index = cartItemsArr.findIndex((index) => index.productId == productId);
            if (index >= 0) {
                cartItemsArr[index].quantity += quantity;
                console.log(cartItemsArr);
                cart = yield cart_1.CartModel.findOneAndUpdate({ customerId }, { $set: { cartItems: cartItemsArr } }, { new: true });
            }
            else {
                cartItemsArr.push(obj);
                cart = yield cart_1.CartModel.findOneAndUpdate({ customerId }, { $set: { cartItems: cartItemsArr } }, { new: true });
            }
        }
        else {
            cartItems.push(obj);
            cart = yield new cart_1.CartModel({
                customerId,
                cartItems: cartItems
            });
            cart.save();
        }
    }
    return res.status(200).send(cart);
}));
router.get('/cart/:customerId/getCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.params.customerId;
    const customerCart = yield cart_1.CartModel.findOne({ customerId: customerId });
    res.status(201).send(customerCart);
}));
//# sourceMappingURL=routes.js.map