export type messageType = {
  text: string;
  idMessage?: string;
  isUser: boolean;
};

export type NotificationData = {
  receiptId: string;
  body: {
    idMessage: string;
    senderData?: {
      sender: string;
      senderName: string;
    };
    messageData?: {
      textMessageData: {
        textMessage?: string;
      };
    };
  };
};

export type chatType = {
  phone: string;
  senderName?: string;
  read: boolean;
  conversation: messageType[];
};
