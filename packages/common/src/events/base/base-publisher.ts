import { NatsConnection } from "nats";
import { Subjects } from "../subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];
  protected client: NatsConnection;

  constructor(client: NatsConnection) {
    this.client = client;
  }

  async publish(data: T["data"]): Promise<void> {
    this.client.publish(this.subject, JSON.stringify(data));

    console.log("Event published to subject", this.subject);
  }
}
