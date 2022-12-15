"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.natsConnection = void 0;
class NatsConnection {
    get client() {
        if (!this._client) {
            throw new Error("Cannot access nats before connecting");
        }
        return this._client;
    }
    setClient(natsClient) {
        this._client = natsClient;
    }
}
exports.natsConnection = new NatsConnection();
//# sourceMappingURL=nats-connection.js.map