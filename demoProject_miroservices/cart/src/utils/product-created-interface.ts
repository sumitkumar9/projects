import { Subjects } from './subjects';

export interface ProductCreatedEvent {
  subject: Subjects.ProductCreated;
  data: {
    productId: string;
    productName: string;
  };
}