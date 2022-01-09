import { LightBulbIcon, MoonIcon } from "@heroicons/react/outline";

//simple header component that displays website name and basic info
const Header = ({ handleDarkModeChange, darkMode }) => {
  return (
    <header className="bg-[#f7f7f7] h-14 sm:h-16 darkMode-offDark-bg">
      <div className="relative flex max-w-5xl h-full mx-auto items-center">
        <div className="flex flex-col ml-2 mb-2 dark:text-[#f7f7f7]">
          <h1 className="font-bold text-2xl">Spacestagram</h1>
          <p className="text-xs text-gray-400">
            Brought to you by NASA&apos;s Astronomy Photo of the Day API
          </p>
        </div>
        {darkMode ? (
          <button
            className="ml-auto mr-2 sm:mr-0 bg-[#f7f7f7] p-1 sm:p-2  rounded transition duration-150 ease-in-out hover:bg-white active:scale-125"
            onClick={handleDarkModeChange}
          >
            <LightBulbIcon className="h-6" />
          </button>
        ) : (
          <button
            className="ml-auto mr-2 sm:mr-0 bg-[#181818] text-[#f7f7f7] p-1 sm:p-2 rounded transition duration-150 ease-in-out hover:bg-gray-600 active:scale-125"
            onClick={handleDarkModeChange}
          >
            <MoonIcon className="h-6" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
