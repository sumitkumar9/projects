import {Subjects} from '../../utils/subjects';
import {Listener } from '../../utils/base-listener';
import {ProductCreatedEvent} from '../../utils/product-created-interface';
import { JsMsg } from "nats";
import { ProductModel } from '../../model/product';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
    subject: Subjects.ProductCreated = Subjects.ProductCreated;
    queueGroupName = "product-service";

    async onMessage(data: ProductCreatedEvent["data"], msg: JsMsg) {
        try {
            console.log(data);
            await new ProductModel(data).save();
            msg.ack();
        }
        catch (e) {
            console.error(e);
        }
    }
}