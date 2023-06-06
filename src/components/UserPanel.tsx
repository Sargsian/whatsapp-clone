const UserPanel = ({
  phone,
  currentPhone,
  lastMessage,
  read,
  onClick,
}: {
  phone: string;
  read: boolean;
  currentPhone: string;
  lastMessage?: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: phone === currentPhone ? "#2a3942" : "" }}
      className="group flex h-[72px] w-full pr-[23px] hover:cursor-pointer hover:bg-[#202c33]"
    >
      <div className="mt-[-2px] flex h-full w-[77px] min-w-[77px] items-center justify-center pr-[2px]">
        <span className="block h-[49px] w-[49px] overflow-hidden rounded-full">
          <img src="./user.svg" alt="" />
        </span>
      </div>
      <div className="flex h-full flex-grow-[1] items-center border-t border-[#202c33] group-first:border-none">
        <div className="relative flex w-full flex-col">
          <span
            style={
              !read && phone !== currentPhone
                ? { color: "white", fontWeight: "500" }
                : {}
            }
            className="text-[17px] text-[#e9edef]"
          >
            {phone}
          </span>
          <p
            style={
              !read && phone !== currentPhone
                ? { color: "#d1d7db", fontWeight: "500" }
                : {}
            }
            className="line-clamp-1 h-5 w-full overflow-hidden text-sm text-[#8696a0]"
          >
            {lastMessage}
          </p>
          <span className="absolute right-0 top-[5px] text-xs text-[#8696a0]">
            Today
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
