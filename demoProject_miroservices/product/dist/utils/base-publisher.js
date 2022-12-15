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
exports.Publisher = void 0;
const nats_1 = require("nats");
class Publisher {
    constructor(client) {
        this.client = client;
    }
    publish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sc = (0, nats_1.StringCodec)();
            console.info("publishing message to", this.subject);
            yield this.client.publish(this.subject, sc.encode(JSON.stringify(data)));
        });
    }
}
exports.Publisher = Publisher;
//# sourceMappingURL=base-publisher.js.map