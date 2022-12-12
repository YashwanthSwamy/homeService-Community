import { MessageQEvent } from "../types/messageQEnums";
import { ActionEvents } from "../types/actionEvents";
import { IEventHandlerResponse } from "../models/eventHandlerResponse";
import { MessagePropertyHeaders } from "amqplib/properties";
import { customerEventHandler } from "./customerEventHandler";

export class EventHandler {

  public async handle(parsedData: any, routingKey: string, headerData: MessagePropertyHeaders): Promise<IEventHandlerResponse> {
    switch (routingKey) {
      case MessageQEvent.CustomerCreated :
      case MessageQEvent.CustomerUpdated : {
        return customerEventHandler.executeCustomerEvents(
          parsedData,
          routingKey,
        );
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
