import { Publisher, UserCreatedEvent, Subjects } from "@bigecommerce/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
