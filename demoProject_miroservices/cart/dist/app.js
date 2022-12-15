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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const routes_1 = require("./routes/routes");
const nats_wrapper_1 = require("./nats-wrapper");
const nats_connection_1 = require("./utils/nats-connection");
const product_created_listener_1 = require("./events/listener/product-created-listener");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(routes_1.router);
mongoose_1.default.connect('mongodb://localhost:27017/cart_Service').then(() => {
    console.log('Product service mongobd connected');
}).catch((e) => {
    console.log(e);
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield nats_wrapper_1.natsWrapper.connect();
    nats_connection_1.natsConnection.setClient(nats_wrapper_1.natsWrapper.client);
    new product_created_listener_1.ProductCreatedListener(nats_wrapper_1.natsWrapper.client).listen().then().catch((error) => {
        console.info(error);
    });
});
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
//# sourceMappingURL=app.js.map