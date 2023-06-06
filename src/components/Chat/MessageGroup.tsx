const MessageGroup = ({
  children,
  isUser,
}: {
  children: React.ReactNode;
  isUser: boolean;
}) => {
  return (
    <div
      style={{ alignSelf: isUser ? "self-end" : "self-start" }}
      className="group/side mb-3 max-w-[60%] flex flex-col"
      data-side={isUser ? "right" : "left"}
    >
      {children}
    </div>
  );
};

export default MessageGroup;
