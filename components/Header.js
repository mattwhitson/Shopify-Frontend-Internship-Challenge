import { useState } from "react";

//simple header component that displays website name and basic info
const Header = () => {
  const [timeframe, setTimeframe] = useState("week");
  return (
    <header className="bg-[#f7f7f7] h-14 sm:h-16">
      <div className="relative flex max-w-5xl h-full mx-auto items-center">
        <div className="flex flex-col ml-2 mb-2 ">
          <h1 className="font-bold text-2xl">Spacestagram</h1>
          <p className="text-xs text-gray-400">
            Brought to you by NASA&apos;s Astronomy Photo of the Day (APOD) API
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
