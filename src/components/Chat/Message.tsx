const Message = ({ children }: { children: string }) => {
  if (children === "") return <></>;

  return (
    <div className="group relative mb-[2px] max-w-full break-words rounded-lg bg-[#005c4b] px-[10px] py-[6px] text-sm text-white group-data-[side=left]/side:self-start group-data-[side=right]/side:self-end group-data-[side=left]/side:bg-[#202c33]">
      <span className="absolute top-0 hidden h-0 w-0 rounded-[3px_3px_0_0] border-l-[8px] border-r-[8px] border-t-[13px] border-solid border-[#005c4b_transparent_transparent_transparent] group-[:first-child]:block group-data-[side=left]/side:left-[-8px] group-data-[side=right]/side:right-[-8px] group-data-[side=left]/side:border-[#202c33_transparent_transparent_transparent]"></span>
      <span>{children}</span>
    </div>
  );
};

export default Message;
