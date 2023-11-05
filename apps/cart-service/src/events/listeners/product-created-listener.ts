import { Listener, ProductCreatedEvent, Subjects } from "@bigecommerce/common";
import { queueGroupName } from "./queue-group-name";
import { Msg } from "nats";
import { Product } from "../../data/mongo/models/Product";

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEvent["data"], msg: Msg) {
    await Product.create({
      _id: data.id,
      author: data.author,
      title: data.title,
      slug: data.slug,
      quantity: data.quantity,
      price: data.price,
      status: data.status,
      condition: data.condition,
      images: data.images,
      videos: data.videos,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
