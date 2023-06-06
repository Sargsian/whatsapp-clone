import Main from "./Main";

const Hero = () => {
  return (
    <Main>
      <div className="relative h-full w-full bg-[#222e35] after:absolute after:bottom-0 after:h-[6px] after:w-full after:bg-[#008069]">
        <div className="flex pb-[20px] h-full w-full flex-col justify-center">
          <img
            src="./hero.svg"
            className="h-[204px] w-[360px] self-center"
            alt=""
          />
          <div className="text-center">
            <h1 className="mt-[42px] text-[32px] font-light leading-[37px] text-[#e9edefe0]">
              WhatsApp Web
            </h1>
            <div className="mt-4 text-sm leading-5 text-[#8696a0]">
              Send and receive messages without keeping your phone online.
              <br />
              Use WhatsApp on up to 4 linked devices and 1 phone at the same
              time.
            </div>
          </div>
          <div className="absolute bottom-10 left-0 right-0 mx-auto flex justify-center text-sm text-[#667781]">
            <img src="./lock.svg" className="mb-[-2px] mr-[3px]" />
            End-to-end encrypted
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Hero;
