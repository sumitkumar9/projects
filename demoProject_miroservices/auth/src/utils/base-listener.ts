import {
    consumerOpts, ConsumerOptsBuilder, createInbox, JetStreamClient, JsMsg,
    StringCodec
} from "nats";
import { Subjects } from "./subjects";

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Listener<T extends Event> {
    abstract subject: T["subject"];
    abstract queueGroupName: string;
    protected client: JetStreamClient;
    abstract onMessage(data: T["data"], msg: JsMsg): void;
    constructor(client: JetStreamClient) {
        this.client = client;
    }

    async listen() {
        const sc = StringCodec();
        const opts: ConsumerOptsBuilder = consumerOpts();
        opts.queue(this.queueGroupName);
        opts.durable(`${this.queueGroupName}:${this.subject.split(".")[1]}`);
        opts.manualAck();
        opts.ackExplicit();
        opts.deliverTo(createInbox());
        const subscription = await this.client.subscribe(this.subject, opts);
        for await (const m of subscription) {
            this.onMessage(JSON.parse(sc.decode(m.data)), m);
        }
        console.info("subscription closed");
    }
}
