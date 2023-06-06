import { ReactNode, createContext, useReducer, useContext } from "react";
import { chatType } from "../types/types";

export const ChatsContext = createContext<chatType[]>([]);
export const ChatDispatchContext =
  createContext<React.Dispatch<ACTIONTYPE> | null>(null);

export const useChats = () => {
  return useContext(ChatsContext);
};

export const useChatDispatch = () => {
  const chatDispatchContext = useContext(ChatDispatchContext);

  if (!chatDispatchContext) {
    throw new Error("Provide argument for custom hook");
  }
  return chatDispatchContext;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, dispatch] = useReducer(chatReducer, initialChats);
  return (
    <ChatsContext.Provider value={chats}>
      <ChatDispatchContext.Provider value={dispatch}>
        {children}
      </ChatDispatchContext.Provider>
    </ChatsContext.Provider>
  );
};

type ACTIONTYPE =
  | {
      type: "add";
      payload: {
        phone: string;
        message: string;
        isUser: boolean;
        senderName?: string;
        read: boolean;
        idMessage?: string;
      };
    }
  | {
      type: "markRead";
      payload: {
        phone: string;
      };
    };

const chatReducer = (
  chats: typeof initialChats,
  action: ACTIONTYPE
): chatType[] => {
  switch (action.type) {
    case "markRead": {
      const chatsCopy = chats.map((chat) => {
        if (chat.phone === action.payload.phone) {
          return {
            ...chat,
            read: true,
          };
        } else {
          return chat;
        }
      });
      localStorage.setItem("chats", JSON.stringify(chatsCopy));
      return chatsCopy;
    }

    case "add": {
      let chatsCopy: chatType[] = [];
      if (chats.length === 0) {
        chatsCopy = [
          {
            phone: action.payload.phone,
            senderName: action.payload.senderName,
            read: action.payload.read,
            conversation: [
              {
                idMessage: action.payload.idMessage,
                text: action.payload.message,
                isUser: action.payload.isUser,
              },
            ],
          },
        ];
      } else {
        const isNew = !chats.find(
          (chat) => chat.phone === action.payload.phone
        );
        if (isNew) {
          chatsCopy = [
            {
              phone: action.payload.phone,
              senderName: action.payload.senderName,
              read: action.payload.read,
              conversation: [
                {
                  idMessage: action.payload.idMessage,
                  text: action.payload.message,
                  isUser: action.payload.isUser,
                },
              ],
            },
            ...chats,
          ];
        } else {
          const updatedChats = chats.map((chat) => {
            console.log(
              "checking message ID",
              chat.conversation.find(
                (message) =>
                  message.idMessage === action.payload.idMessage &&
                  action.payload.idMessage !== undefined
              )
            );
            if (
              chat.phone === action.payload.phone &&
              !chat.conversation.find(
                (message) =>
                  message.idMessage === action.payload.idMessage &&
                  action.payload.idMessage !== undefined
              )
            ) {
              return {
                ...chat,
                read: action.payload.read,
                conversation: [
                  ...chat.conversation,
                  {
                    idMessage: action.payload.idMessage,
                    text: action.payload.message,
                    isUser: action.payload.isUser,
                  },
                ],
              };
            } else return chat;
          });

          chatsCopy = [
            updatedChats.find((chat) => chat.phone === action.payload.phone)!,
            ...updatedChats.filter(
              (chat) => chat.phone !== action.payload.phone
            ),
          ];
        }
      }
      localStorage.setItem("chats", JSON.stringify(chatsCopy));
      return chatsCopy;
    }

    default:
      return initialChats;
  }
};

const initialChats: chatType[] = JSON.parse(
  localStorage.getItem("chats") || "[]"
);
