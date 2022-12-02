import * as amqp from "amqp-connection-manager";
import { environmentVariables } from "../../../configuration/environmentVariables";
import { MessageQChannelVariables, MessageQueueConnectionType } from "../types/messageQEnums";

export class MessageQConnector {
  public MessageQRXConnector: amqp.AmqpConnectionManager;
  public MessageQTXConnector: amqp.AmqpConnectionManager;

  constructor() {
    this.MessageQRXConnector = this.initiateConnection(MessageQueueConnectionType.CONSUMER);
    this.MessageQTXConnector = this.initiateConnection(MessageQueueConnectionType.PUBLISHER);
  }

  private initiateConnection(connectorName: string): amqp.AmqpConnectionManager {
    const messageQConnector = amqp.connect([this.getURL()], {
      connectionOptions: {
        clientProperties: {
          connection_name: `CommunityService ${connectorName}`
        }
      },
      findServers: () => this.getURL()
    } as any);
    this.setConnectionListeners(messageQConnector, connectorName);
    return messageQConnector;
  }

  private getURL() {
      return environmentVariables.MQ_URL;
  }

  private setConnectionListeners(connection: amqp.AmqpConnectionManager, sourceConnector: string) {
    if (!connection) {
      console.warn("[RQ] Failed to establish connection", { connectionType: sourceConnector });
      return;
    }
    connection.on(MessageQChannelVariables.CONNECT, () => console.log("[RQ] Connection established", { connectionType: sourceConnector }));
    connection.on(MessageQChannelVariables.DISCONNECT, (error: Error) => console.log("[RQ] Server disconnected", { connectionType: sourceConnector, error: error }));

    connection.on(MessageQChannelVariables.ERROR, (err: any) => console.error("[RQ] Error while connecting", { connectionType: sourceConnector, error: err }));
    connection.on(MessageQChannelVariables.CLOSE, (err: any) => console.error("[RQ] Connection closed", { connectionType: sourceConnector, error: err }));

    connection.on(MessageQChannelVariables.BLOCKED, (reason: any) => console.error("[RQ] Connection blocked", { connectionType: sourceConnector, reason: reason }));
    connection.on(MessageQChannelVariables.UNBLOCKED, () => console.error("[RQ] Connection unblocked", { connectionType: sourceConnector }));
  }
}
