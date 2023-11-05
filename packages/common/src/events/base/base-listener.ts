import { Msg, NatsConnection, StringCodec } from "nats";
import { Subjects } from "../subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Msg): void;
  protected client: NatsConnection;

  constructor(client: NatsConnection) {
    this.client = client;
  }

  listen() {
    this.client.subscribe(this.subject, {
      queue: this.queueGroupName,
      callback: (err, msg) => {
        const parsedData = this.parseMessage(msg);

        this.onMessage(parsedData, msg);
      },
    });
  }

  parseMessage(msg: Msg) {
    const sc = StringCodec();
    const data = sc.decode(msg.data);
    return JSON.parse(data);
  }
}
