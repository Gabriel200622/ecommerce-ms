import { NatsConnection, connect } from "nats";

class NatsWrapper {
  private _client?: NatsConnection;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting");
    }

    return this._client;
  }

  async connect() {
    this._client = await connect();

    console.log(`🚀 Connected to nats server on ${this.client.getServer()}`);

    return this.client;
  }
}

export const natsWrapper = new NatsWrapper();
