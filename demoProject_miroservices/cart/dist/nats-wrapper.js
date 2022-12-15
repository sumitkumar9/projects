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
exports.natsWrapper = void 0;
const crypto_1 = require("crypto");
const nats_1 = require("nats");
class NatsWrapper {
    get client() {
        if (!this._client) {
            throw new Error("Cannot access nats before connecting");
        }
        return this._client;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, nats_1.connect)({ servers: ["http://localhost:4222"], name: (0, crypto_1.randomBytes)(4).toString("hex") });
            this._client = connection.jetstream();
            const jsm = yield connection.jetstreamManager();
            yield jsm.streams.add({ name: "phoenix", subjects: ["phoenix.*"] });
            console.info("Connected to NATS JetStream");
        });
    }
}
exports.natsWrapper = new NatsWrapper();
//# sourceMappingURL=nats-wrapper.js.map