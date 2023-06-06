import Axios from "axios";
import Main from "../Main";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useChatDispatch, useChats } from "../../store/ChatContext";
import { renderGroupList } from "../../utils/renderGroupList";
import SimpleBar from "simplebar-react";

import "simplebar-react/dist/simplebar.min.css";

type Props = {
  id: string;
  token: string;
  currentPhone: string;
};

const Chat = ({ id, token, currentPhone }: Props) => {
  const scrollRef = useRef<HTMLElement>(null);
  const [message, setMessage] = useState("");
  const chats = useChats();
  const dispatch = useChatDispatch();

  const sendMessageHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (message.length === 0 || message.trim().length === 0) return;
    try {
      const res = await Axios.post(
        `https://api.green-api.com/waInstance${id}/sendMessage/${token}`,
        JSON.stringify({
          chatId: `${currentPhone}@c.us`,
          message: message,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.statusText === "OK") {
        dispatch({
          type: "add",
          payload: {
            isUser: true,
            message: message,
            phone: currentPhone,
            read: true,
          },
        });
      }

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight + 4;
    }
  }, [currentPhone]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight + 4;
    }
  }, [chats]);

  const chat = chats.find((currentChat) => currentChat.phone === currentPhone);

  return (
    <Main>
      <div className="relative h-full w-full">
        <header className="absolute left-0 top-0 z-20 h-[59px] w-full bg-[#202c33]"></header>
        <div className="relative h-[calc(100%-62px)] w-full overflow-hidden pt-[59px] after:absolute after:left-[-1px] after:top-0 after:h-full after:w-full after:bg-[url('/chat-bg.png')] after:opacity-5">
          {/* chat wrapper with overflow-hidden */}
          <div className="relative z-10 flex h-full w-full flex-col-reverse">
            <SimpleBar
              scrollableNodeProps={{ ref: scrollRef }}
              autoHide={false}
              style={{ maxHeight: "100%" }}
            >
              {/* scrollable chat container */}
              <div className="flex min-h-full w-full flex-col px-[25px] pb-1 pt-4 lg:px-[70px]">
                {chat?.conversation &&
                  chat.conversation.length > 0 &&
                  renderGroupList(chat.conversation)}
              </div>
            </SimpleBar>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-10 h-[62px] w-full bg-[#202c33]">
          <form
            onSubmit={sendMessageHandler}
            className="flex h-full items-center justify-center gap-5 px-5"
          >
            <input
              className="flex-1 rounded-lg bg-[#2a3942] px-[12px] py-[9px] text-[#d1d7db] outline-none"
              placeholder="Type a message"
              onChange={(e) => setMessage(e.currentTarget.value)}
              value={message}
              type="text"
            />
            <button>
              <img src="./send.svg" className="hover:cursor-pointer" alt="" />
            </button>
          </form>
        </div>
      </div>
    </Main>
  );
};

export default Chat;
