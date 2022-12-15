import {Publisher} from '../../utils/base-publisher'
import {ProductCreatedEvent} from '../../utils/product-created-interface'
import { Subjects } from '../../utils/subjects'

export class ProductCreatedpublisher extends Publisher<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
}
