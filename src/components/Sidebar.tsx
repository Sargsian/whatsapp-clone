import { Dispatch, SetStateAction, FormEvent, useState } from "react";
import UserPanel from "./UserPanel";
import Modal from "./Modal";
import { useChatDispatch, useChats } from "../store/ChatContext";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

type Props = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  currentPhone: string;
  setCurrentPhone: Dispatch<SetStateAction<string>>;
};

const Sidebar = (props: Props) => {
  const { id, setId, token, setToken, currentPhone, setCurrentPhone } = props;
  const chats = useChats();
  const dispatch = useChatDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);


  const handleShowConfirmation = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };

  const handleSaveApiData = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    handleShowConfirmation();
  };

  const handleResetApiData = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("id", "");
    localStorage.setItem("token", "");
    setId("");
    setToken("");
  };

  return (
    <div className="h-full min-w-[340px] max-w-[45%] flex-[0_0_45%] overflow-hidden min-[900px]:max-w-[40%] min-[900px]:flex-[0_0_40%] min-[1300px]:max-w-[30%] min-[1300px]:flex-[0_0_30%]">
      <header className="h-[59px] bg-[#202c33]">
        <div className="flex h-full items-center justify-between px-4">
          <img src="./user.svg" className="h-10 w-10" alt="" />
          <Modal setPhone={setCurrentPhone}>
            <div className="flex items-center gap-2 text-[#d1d7db]">
              Add phone number
              <img
                src="./add.svg"
                className="h-8 w-8 hover:cursor-pointer"
                alt=""
              />
            </div>
          </Modal>
        </div>
      </header>
      <form className="flex flex-col gap-3 py-6">
        <input
          type="text"
          name="id"
          value={id}
          onChange={(e) => setId(e.currentTarget.value)}
          className="bg-[#2a3942] px-[12px] py-[9px] text-[#d1d7db] outline-none"
          placeholder="idInstance"
        />
        <input
          type="text"
          name="token"
          value={token}
          onChange={(e) => setToken(e.currentTarget.value)}
          className="bg-[#2a3942] px-[12px] py-[9px] text-[#d1d7db] outline-none"
          placeholder="apiTokenInstance"
        />
        <div className="flex">
          <button
          type="button"
            onClick={handleResetApiData}
            className="flex-1 border-y border-neutral-700 py-2 text-[#d1d7db] hover:bg-[#2a3942]"
          >
            Reset
          </button>
          <button
            onClick={handleSaveApiData}
            type="submit"
            className="flex-1 border border-r-0 border-neutral-700 text-[#d1d7db] hover:bg-[#2a3942]"
          >
            Persist
          </button>
          {showConfirmation && (
              <span onClick={() => {setShowConfirmation(false)}} className="absolute cursor-pointer left-1/2 top-8 z-40 -translate-x-1/2 whitespace-nowrap rounded-sm bg-[#008069] p-2 text-white shadow-2xl">
                Data is persisted!
              </span>
            )}
        </div>
      </form>
      <div className="h-[calc(100%-59px-49px)]">
        <SimpleBar autoHide={false} style={{ maxHeight: "100%" }}>
          {chats.length > 0 &&
            chats.map((chat) => (
              <UserPanel
                key={chat.phone}
                phone={chat.phone}
                read={chat.read}
                currentPhone={currentPhone}
                onClick={() => {
                  setCurrentPhone(chat.phone);
                  dispatch({
                    type: "markRead",
                    payload: { phone: chat.phone },
                  });
                }}
                lastMessage={chat.conversation.at(-1)?.text}
              />
            ))}
        </SimpleBar>
      </div>
    </div>
  );
};

export default Sidebar;
