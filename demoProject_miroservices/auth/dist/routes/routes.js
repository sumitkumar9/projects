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
const customer_1 = require("../model/customer");
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    const userExist = yield customer_1.Customer.findOne({ email: email });
    if (userExist) {
        return res.send('user already exist');
    }
    const user = yield new customer_1.Customer({
        email,
        firstName,
        lastName,
        password
    });
    const createdUser = yield user.save();
    // if (createdUser) {
    //     await axios.post("http://localhost:4006/events", {
    //         type: "UserCreated",
    //         data: {
    //             customerId: createdUser._id,
    //         },
    //     });
    // }
    return res.status(200).send(createdUser);
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userExist = yield customer_1.Customer.findOne({ email: email, password: password });
    if (userExist) {
        return res.status(200).send('you are in!');
    }
    else {
        return res.send('please provide valid email or password');
    }
}));
//# sourceMappingURL=routes.js.map