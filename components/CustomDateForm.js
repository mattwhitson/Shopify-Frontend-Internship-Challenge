import { Menu } from "@headlessui/react";

const CustomDateForm = ({
  setCustomTimeInterval,
  onEndTimeChange,
  onStartTimeChange,
}) => {
  return (
    <form
      onSubmit={setCustomTimeInterval}
      className="darkMode-dark-bg dark:text-[#f7f7f7]"
    >
      <p className="text-sm font-semibold mb-2">Custom Time Range</p>
      <div className="hidden sm:flex items-baseline justify-between mr-[50%] text-sm font-semibold">
        <label>Start:</label>
        <label>End:</label>
      </div>
      <input
        type="date"
        className="hidden sm:inline-block bg-[#f7f7f7] text-black
           p-1 rounded-sm hover:cursor-pointer darkMode-dark-bg dark:text-[#f7f7f7]"
        onChange={onEndTimeChange}
      />
      <input
        type="date"
        className="hidden sm:inline-block bg-[#f7f7f7] text-black
            p-1 rounded-sm hover:cursor-pointer darkMode-dark-bg dark:text-[#f7f7f7]"
        onChange={onStartTimeChange}
      />
      <div className="flex items-center justify-between sm:hidden">
        <label className="text-sm font-semibold">From:</label>
        <input
          type="date"
          className="bg-[#f7f7f7] text-black
           p-1 rounded-sm hover:cursor-pointer darkMode-dark-bg dark:text-[#f7f7f7]"
          onChange={onEndTimeChange}
        />
      </div>
      <div className="flex items-center justify-between sm:hidden">
        <label className="text-sm font-semibold">To:</label>
        <input
          type="date"
          className="bg-[#f7f7f7] text-black
            p-1 rounded-sm hover:cursor-pointer darkMode-dark-bg dark:text-[#f7f7f7]"
          onChange={onStartTimeChange}
        />
      </div>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active
                ? "bg-blue-500 text-[#f7f7f7] dark:bg-blue-800"
                : "text-black dark:text-[#f7f7f7]"
            } block mt-1 py-2 px-4 rounded-sm hover:cursor-pointer`}
            type="submit"
          >
            Set Custom Time
          </button>
        )}
      </Menu.Item>
    </form>
  );
};

export default CustomDateForm;
