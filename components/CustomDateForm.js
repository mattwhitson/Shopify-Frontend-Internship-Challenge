import { Menu } from "@headlessui/react";

const CustomDateForm = ({ setCustomTimeInterval, onStartTimeChange }) => {
  return (
    <form
      onSubmit={setCustomTimeInterval}
      className="darkMode-dark-bg dark:text-[#f7f7f7]"
    >
      <p className="text-sm font-semibold mb-2 p-1">Custom Time Range</p>
      <div className="sm:flex items-baseline text-sm font-semibold">
        <label>Start from:</label>
        <input
          type="date"
          className="ml-6 bg-[#f7f7f7] text-black
           p-1 rounded-sm hover:cursor-pointer focus:outline-none darkMode-dark-bg dark:text-[#f7f7f7]"
          onChange={onStartTimeChange}
        />
      </div>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active
                ? "bg-blue-500 text-[#f7f7f7] dark:bg-blue-800"
                : "text-black bg-blue-400 dark:text-[#f7f7f7]"
            } block mt-1 py-2 px-4 rounded-sm hover:cursor-pointer shadow-blue-500/30`}
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
