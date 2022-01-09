import { Menu } from "@headlessui/react";

const CustomDateForm = ({
  setCustomTimeInterval,
  onEndTimeChange,
  onStartTimeChange,
}) => {
  return (
    <form onSubmit={setCustomTimeInterval}>
      <span className="text-sm font-semibold mb-2">Custom Time Range</span>
      <div className="hidden sm:flex items-baseline justify-between mr-[50%] text-sm font-semibold">
        <label>Start:</label>
        <label>End:</label>
      </div>
      <input
        type="date"
        className="hidden sm:inline-block bg-[#f7f7f7] text-black
           p-1 rounded-sm hover:cursor-pointer"
        onChange={onEndTimeChange}
        required={true}
      />
      <input
        type="date"
        className="hidden sm:inline-block bg-[#f7f7f7] text-black
            p-1 rounded-sm hover:cursor-pointer"
        onChange={onStartTimeChange}
        required={true}
      />
      <div className="flex items-center justify-between sm:hidden">
        <span className="text-sm font-semibold">From:</span>
        <input
          type="date"
          className="bg-[#f7f7f7] text-black
           p-1 rounded-sm hover:cursor-pointer"
          onChange={onEndTimeChange}
          required={true}
        />
      </div>
      <div className="flex items-center justify-between sm:hidden">
        <span className="text-sm font-semibold">To:</span>
        <input
          type="date"
          className="bg-[#f7f7f7] text-black
            p-1 rounded-sm hover:cursor-pointer"
          onChange={onStartTimeChange}
          required={true}
        />
      </div>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-blue-500 text-white" : "text-black"
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
