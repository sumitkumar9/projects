import { JetStreamClient } from "nats";

class NatsConnection {
    private _client?: JetStreamClient;
    get client() {
        if (!this._client) {
            throw new Error("Cannot access nats before connecting");
        }
        return this._client;
    }

    setClient(natsClient: JetStreamClient): void {
        this._client = natsClient;
    }
}

export const natsConnection = new NatsConnection();
