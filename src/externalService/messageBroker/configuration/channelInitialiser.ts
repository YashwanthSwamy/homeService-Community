import {
  MessageQQueues,
  MessageQChannelVariables,
  MessageQEvent,
} from "../types/messageQEnums";
import { Channel } from "amqplib";

export class ChannelInitializer {
  /**
   * Inits channel initializer
   * @param channel  <Channel>
   */
  public async init(channel: Channel) {
    await this.assertExchangeForReceivingChannel(channel);
    await this.assertQueueForReceivingChannel(channel);
    await this.bindQueueForMessageEvents(channel);
  }
  /**
   * Asserts exchange for receiving channel
   * @param channel <Channel>
   */
  private async assertExchangeForReceivingChannel(channel: Channel) {
    await channel.assertExchange(
      MessageQChannelVariables.EVENTS,
      MessageQChannelVariables.TOPIC,
      { durable: true }
    );
    await channel.assertExchange(
      MessageQChannelVariables.COLLECTED,
      MessageQChannelVariables.TOPIC,
      { durable: true }
    );
  }
  /**
   * Asserts queue for receiving channel
   * @param channel  <Channel>
   */
  private async assertQueueForReceivingChannel(channel: Channel) {
    await channel.assertQueue(
      MessageQQueues.COMMUNITY_SERVICE_QUEUE
    );
  }

  /**
   * Binds queue for message events
   * @param channel  <Channel>
   */
  private async bindQueueForMessageEvents(channel: Channel) {
    await channel.bindQueue(MessageQQueues.COMMUNITY_SERVICE_QUEUE, MessageQChannelVariables.EVENTS, MessageQEvent.CustomerCreated);
    await channel.bindQueue(MessageQQueues.COMMUNITY_SERVICE_QUEUE, MessageQChannelVariables.EVENTS, MessageQEvent.CustomerUpdated);
  }
}

const channelInitializer = new ChannelInitializer();
export default channelInitializer;
