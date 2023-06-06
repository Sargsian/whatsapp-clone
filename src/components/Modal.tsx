import { Dialog, Transition } from "@headlessui/react";
import {
  Dispatch,
  FormEvent,
  Fragment,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { useChatDispatch } from "../store/ChatContext";

type Props = {
  setPhone: Dispatch<SetStateAction<string>>;
  children: ReactNode;
};

export default function Modal({ children, setPhone }: Props) {
  let [isOpen, setIsOpen] = useState(false);
  const [modalPhone, setModalPhone] = useState('')
  const dispatch = useChatDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addPhoneHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!modalPhone) return;
    setPhone(modalPhone);
    closeModal();
    dispatch({
      type: "add",
      payload: {
        isUser: true,
        phone: modalPhone,
        message: "",
        read: true,
      },
    });
    setModalPhone('')
  };

  return (
    <>
      <button type="button" onClick={openModal}>
        {children}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  as="form"
                  className="w-full max-w-md transform overflow-hidden rounded bg-neutral-100 p-6 text-center align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Phone Number
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={modalPhone}
                      onChange={(e) => setModalPhone(e.currentTarget.value)}
                      className="w-full rounded bg-neutral-200 px-[12px] py-[9px] text-black outline-none"
                      placeholder="Phone number"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={addPhoneHandler}
                    >
                      Confirm
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
