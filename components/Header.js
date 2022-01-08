import { useState } from "react";

const Header = () => {
  const [timeframe, setTimeframe] = useState("week");
  return (
    <div className="bg-[#f7f7f7] h-14 sm:h-18">
      <div className="relative flex max-w-5xl h-full mx-auto items-center">
        <div className="flex flex-col ml-2 mb-2 ">
          <h1 className="font-bold text-2xl">Spacestagram</h1>
          <span className="text-xs text-gray-400">
            Brought to you by NASA&apos;s Astronomy Photo of the Day (APOD) API
          </span>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Header;
