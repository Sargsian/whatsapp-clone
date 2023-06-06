import { useState, useEffect } from "react";
import Chat from "./components/Chat/Index";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import { useChatDispatch } from "./store/ChatContext";
import Axios from "axios";
import { NotificationData } from "./types/types";

function App() {
  const [id, setId] = useState(localStorage.getItem("id") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [currentPhone, setCurrentPhone] = useState("");
  const dispatch = useChatDispatch();
  const [funcCallTime, setFuncCallTime] = useState("");

  const getMessage = async () => {
    console.log("running getMessage");
    try {
      const res = await Axios.get<NotificationData>(
        `https://api.green-api.com/waInstance${id}/receiveNotification/${token}`
      );
      console.log("response", res);
      if (res.data) {
        const receiptId = res.data.receiptId;
        const message =
          res.data.body?.messageData?.textMessageData?.textMessage;
        const senderPhone = res.data.body.senderData?.sender.split("@")[0];
        const senderName = res.data.body.senderData?.senderName;
        const idMessage = res.data.body.idMessage;

        if (message && senderPhone && senderName) {
          dispatch({
            type: "add",
            payload: {
              phone: senderPhone,
              isUser: false,
              message: message,
              senderName: senderName,
              read: senderPhone === currentPhone,
              idMessage: idMessage,
            },
          });
        }
        if (receiptId) {
          await Axios.delete(
            `https://api.green-api.com/waInstance${id}/deleteNotification/${token}/${receiptId}`
          );
        }
      }
      setFuncCallTime(`${Date.now()}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const callInterval = setInterval(() => {
      if (Date.now() - +funcCallTime > 10000) {
        getMessage();
      }
    }, 1000);
    getMessage();

    return () => clearInterval(callInterval);
  }, [funcCallTime, currentPhone, token, id]);

  return (
    <div className="overflow-hidden bg-[#151A21] min-[1441px]:px-[19px]">
      <div className="mx-auto flex h-screen w-full max-w-[1600px] min-[1441px]:py-[19px]">
        <Sidebar
          token={token}
          setToken={setToken}
          id={id}
          setId={setId}
          currentPhone={currentPhone}
          setCurrentPhone={setCurrentPhone}
        />
        {currentPhone ? (
          <Chat id={id} token={token} currentPhone={currentPhone} />
        ) : (
          <Hero />
        )}
      </div>
    </div>
  );
}

export default App;
