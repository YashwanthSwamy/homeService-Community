import { MessageQEvent } from "../types/messageQEnums";
import { ActionEvents } from "../Types/ActionEvents";
import { IEventHandlerResponse } from "../models/eventHandlerResponse";
import { MessagePropertyHeaders } from "amqplib/properties";

export class EventHandler {

  public async handle(parsedData: any, routingKey: string, headerData: MessagePropertyHeaders): Promise<IEventHandlerResponse> {
    switch (routingKey) {
      case MessageQEvent.UserCreated : {
        // return chargerEventHandler.executeUserEvents(
        //   parsedData,
        //   routingKey,
        //   headerData
        // );
      }
      default:
        console.warn("[RQ] Not consumed/unknown", { inputData: parsedData, routingKey });
        return {
          action: ActionEvents.Reject,
        };
    }
  }
}

const eventHandler = new EventHandler();
export default eventHandler;
