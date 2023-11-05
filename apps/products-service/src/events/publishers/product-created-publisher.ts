import { Publisher, Subjects, ProductCreatedEvent } from "@bigecommerce/common";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
