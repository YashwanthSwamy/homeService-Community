export const MessageQEvent = {
    UserCreated : "event.user.created" 
};

export enum MessageQQueues {
    COMMUNITY_SERVICE_QUEUE = "CommunityServiceQueue",
}


export enum MessageQChannelVariables {
    CONNECT = "connect",
    CLOSE = "close",
    ERROR = "error",
    CANCEL = "cancel",
    DISCONNECT = "disconnect",
    EVENTS = "events",
    TOPIC = "topic",
    DIRECT = "direct",
    FANOUT = "fanout",
    CREATE = "create",
    BLOCKED = "blocked",
    UNBLOCKED = "unblocked",
    COLLECTED = "collected"
}

export enum MessageQueueConnectionType {
    PUBLISHER = "Publisher",
    CONSUMER = "Consumer"
}
