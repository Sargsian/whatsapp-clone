import { ReactNode } from "react";
import Message from "../components/Chat/Message";
import MessageGroup from "../components/Chat/MessageGroup";
import { messageType } from "../types/types";

export function renderGroupList(messageList: messageType[]) {
  let group: ReactNode[] = [];
  let isCurrentUser = false;
  const list = [];
  for (let i = 0; i < messageList.length; i++) {
    if (i === 0) {
      group.push(<Message key={i}>{messageList[i].text}</Message>);
      isCurrentUser = messageList[i].isUser;
    } else if (messageList[i].isUser === messageList[i - 1].isUser) {
      group.push(<Message key={i}>{messageList[i].text}</Message>);
    } else {
      list.push(
        <MessageGroup key={i} isUser={messageList[i - 1].isUser}>
          {group}
        </MessageGroup>
      );
      isCurrentUser = messageList[i].isUser;
      group = [];
      group.push(<Message key={i}>{messageList[i].text}</Message>);
    }
  }

  list.push(
    <MessageGroup key={"qwr"} isUser={isCurrentUser}>
      {group}
    </MessageGroup>
  );
  return list;
}
