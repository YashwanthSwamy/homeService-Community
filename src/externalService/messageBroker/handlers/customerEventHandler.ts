import { MessagePropertyHeaders } from "amqplib/properties";
import { IEventHandlerResponse } from "../models/eventHandlerResponse";
import { customerService } from "../service/customerService";
import { ActionEvents } from "../types/actionEvents";
import { MessageQEvent } from "../types/messageQEnums";

export class CustomerEventHandler {
    public async executeCustomerEvents(
        parsedData: any,
        routingKey: string,
      ): Promise<IEventHandlerResponse> {
        switch (routingKey) {
            case MessageQEvent.CustomerCreated: {
              console.log("[RQ] Received Customer Created Message");
              await customerService.customerCreated(parsedData);
              return { action: ActionEvents.Acknowledge };
            }
            case MessageQEvent.CustomerUpdated: {
              console.log("[RQ] Received Customer Updated Message");
              await customerService.customerUpdated(parsedData);
              return { action: ActionEvents.Acknowledge };
            }
            default:
              console.warn("[RQ] Not consumed/unknown", { inputData: parsedData, routingKey });
              return { action: ActionEvents.Reject };
          }
      }
}

const customerEventHandler = new CustomerEventHandler();
export { customerEventHandler }