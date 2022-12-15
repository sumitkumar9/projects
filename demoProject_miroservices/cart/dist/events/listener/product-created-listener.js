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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCreatedListener = void 0;
const subjects_1 = require("../../utils/subjects");
const base_listener_1 = require("../../utils/base-listener");
const product_1 = require("../../model/product");
class ProductCreatedListener extends base_listener_1.Listener {
    constructor() {
        super(...arguments);
        this.subject = subjects_1.Subjects.ProductCreated;
        this.queueGroupName = "product-service";
    }
    onMessage(data, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data);
                yield new product_1.ProductModel(data).save();
                msg.ack();
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.ProductCreatedListener = ProductCreatedListener;
//# sourceMappingURL=product-created-listener.js.map