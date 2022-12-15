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
const router = express_1.default.Router();
exports.router = router;
const product_1 = require("../models/product");
const product_created_publisher_1 = require("../events/publishers/product-created-publisher");
const nats_wrapper_1 = require("../nats-wrapper");
router.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.Product.find({});
    res.send(product);
}));
router.post('/createProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { productName, isActive, description, category } = req.body;
    const product = yield new product_1.Product({
        productName,
        isActive,
        description,
        category
    });
    const createdProduct = yield product.save();
    yield new product_created_publisher_1.ProductCreatedpublisher(nats_wrapper_1.natsWrapper.client).publish({
        productId: createdProduct.id,
        productName: createdProduct.productName
    });
    res.send(createdProduct);
}));
//# sourceMappingURL=routes.js.map