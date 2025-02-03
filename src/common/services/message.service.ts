import { Injectable } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";

export const MESSAGE_ADDED = "MESSAGE_ADDED";
const messages = [
  { id: "id_1_" + Date.now(), content: "James mail" },
  { id: "id_2_" + Date.now(), content: "Kemi tells it all gist" },
];

@Injectable()
export class MessageService {
  constructor(private pubsub: PubSub) {}

  async all() {
    return messages;
  }

  async send(content: string) {
    const msg = {
      id: "id_" + messages.length + "_" + Date.now(),
      content,
    };

    messages.push(msg);
    this.pubsub.publish(MESSAGE_ADDED, { messageAdded: msg });

    return msg;
  }
}
