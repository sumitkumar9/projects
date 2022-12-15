import { randomBytes } from "crypto";
import { connect, JetStreamClient, NatsConnection } from "nats";

class NatsWrapper {
    private _client?: JetStreamClient; // ? means that it can be undefined sometimes
    get client() {
        if (!this._client) {
            throw new Error("Cannot access nats before connecting");
        }
        return this._client;
    }

    async connect(): Promise<void> {
        const connection: NatsConnection = await connect({ servers: ["http://localhost:8222"], name: randomBytes(4).toString("hex") });
        this._client = connection.jetstream();
        const jsm = await connection.jetstreamManager();
        await jsm.streams.add({ name: "phoenix", subjects: ["phoenix.*"] });
        console.info("Connected to NATS JetStream");
    }
}

export const natsWrapper = new NatsWrapper();
