import { Menu } from "@headlessui/react";
import moment from "moment-timezone";
moment.tz.add("America/New_York|EST EDT EWT EPT|50 40 40 40");

const CustomDateForm = ({
  setCustomTimeInterval,
  onStartTimeChange,
  startTime,
}) => {
  const defaultDateValue = moment(new Date()).tz("EST").format("YYYY-MM-DD");
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
           p-1 rounded-sm hover:cursor-pointer focus:outline-none darkMode-dark-bg dark:text-[#f7f7f7] dark:dark-calendar"
          onChange={onStartTimeChange}
          value={!startTime ? defaultDateValue : startTime}
        />
      </div>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active
                ? "bg-blue-700 text-[#f7f7f7] dark:bg-blue-800"
                : "bg-blue-500 dark:bg-blue-700 text-[#f7f7f7]"
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
