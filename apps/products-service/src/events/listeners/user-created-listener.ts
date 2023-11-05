import { Msg } from "nats";
import { Listener, UserCreatedEvent, Subjects } from "@bigecommerce/common";
import { queueGroupName } from "./queue-group-name";
import { User } from "../../data/mongo/models/User";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserCreatedEvent["data"], msg: Msg) {
    const userExists = await User.findById(data.id);

    if (userExists) return;

    await User.create({
      _id: data.id,
      name: data.name,
      username: data.username,
      userImageId: data.userImageId,
      userImageUrl: data.userImageUrl,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
