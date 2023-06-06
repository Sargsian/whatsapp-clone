const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-w-[411px] flex-grow-[1] border-l-[1px] border-neutral-700">
      {children}
    </div>
  );
};

export default Main;
