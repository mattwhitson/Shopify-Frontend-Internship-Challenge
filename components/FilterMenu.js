import { Menu, Transition } from "@headlessui/react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { fetchData, fetchRandomData } from "../services/fetchData";
import CustomDateForm from "./CustomDateForm";
import moment from "moment-timezone";
moment.tz.add("America/New_York|EST EDT EWT EPT|50 40 40 40");

//Simple sorting method selection menu
//Decided to use @headlessui/react Menu because it provides some nice accessiblity features out of the box, like pressing ESC / clicking outside the menu to close and using arrow keys to navigate
const FilterMenu = ({
  handleDataChange,
  handleLoadingChange,
  handleDateError,
  handleCurrentDateChange,
}) => {
  const [currentSortingMethod, setCurrentSortingMethod] = useState(
    "Chronological Order"
  );
  const [startTime, setStartTime] = useState(null);

  //predefined sortMethods for timeframe selection menu
  const sortMethods = [
    { name: "Chronological Order" },
    { name: "Random Order" },
  ];

  //function that sets the new inital time range for Chronological Order
  const setTimeInterval = async (sortType) => {
    handleLoadingChange(true);

    if (sortType.name === "Random Order") {
      //fetch randomized pictures from API and set currentDate to null so that useNextPage hook knows to fetch random data
      const response = await fetchRandomData();
      handleDataChange(response);
      handleCurrentDateChange(null);
    } else {
      //get new start date and end date for query to API
      const today = moment(new Date()).tz("EST").format();

      const end_time = moment(new Date()).tz("EST").format("YYYY-MM-DD");
      const start_time = moment(end_time)
        .subtract(15, "days")
        .tz("EST")
        .format("YYYY-MM-DD");

      //call API and set new pictures
      const response = await fetchData(start_time, end_time);
      handleDataChange(response.reverse());
      handleCurrentDateChange(today);
    }

    handleLoadingChange(false);

    //set new current timeframe for time selection menu in order to display current time frame
    const newSortingMethod = sortMethods.filter(
      (sortMethod) => sortMethod.name === sortType.name
    );

    setCurrentSortingMethod(newSortingMethod[0].name);
  };

  //function to compute custom timeframe selection
  //Decided to use the moment-timezone library with EST timezone setting because that is roughly when NASA uploads their new photos (12am EST) and it will avoid duplicate posts depending on someone's timezone!
  const setCustomTimeInterval = async (event) => {
    event.preventDefault();

    if (startTime === null) {
      handleDateError("You must enter in a date. Please try again.");
      return;
    }

    if (
      Date.parse(moment(startTime).tz("EST").format()) >
      Date.parse(moment(new Date()).tz("EST").format())
    ) {
      handleDateError(
        "You cannot enter a date in the future. Please try again."
      );
      return;
    }

    handleLoadingChange(true);

    const startDate = new Date(startTime);
    const newCurrentDate = moment(startDate).tz("EST").format();
    const endTime = moment(newCurrentDate)
      .subtract(15, "days")
      .tz("EST")
      .format("YYYY-MM-DD");

    const response = await fetchData(endTime, startTime);

    handleDataChange(response.reverse());
    handleCurrentDateChange(newCurrentDate);

    handleLoadingChange(false);

    setCurrentSortingMethod("Custom");
    setStartTime(null);
  };

  //event callback to handle start time input
  const onStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  return (
    <Menu
      as="section"
      className="ml-auto relative transition-colors dark:text-[#f7f7f7]"
    >
      Posts in:
      <Menu.Button className="bg-[#f7f7f7] ml-2 py-2 px-4 rounded focus:outline-none darkMode-dark-bg">
        <div className="flex items-center">
          {currentSortingMethod}
          <ChevronDownIcon className="h-4 ml-2" />
        </div>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-75 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-75 opacity-0"
      >
        <Menu.Items className="absolute bg-[#f7f7f7] flex flex-col ml-[82px] mt-2 p-2 space-y-1 rounded-md shadow-lg focus:outline-none darkMode-dark-bg dark:text-[#f7f7f7]">
          <div className="border-b-[1px] border-gray-200 pb-1 dark:border-gray-800">
            {sortMethods.map((sortMethod, index) => (
              <Menu.Item
                key={index}
                disabled={currentSortingMethod === sortMethod.name}
              >
                {({ active, disabled }) => (
                  <div
                    className={`${
                      disabled
                        ? "text-gray-400 dark:text-gray-500"
                        : active
                        ? "bg-blue-500 text-[#f7f7f7] dark:bg-blue-800"
                        : "bg-[#f7f7f7] text-black"
                    } p-1 rounded-sm hover:cursor-pointer darkMode-dark-bg dark:text-[#f7f7f7]`}
                    onClick={() => setTimeInterval(sortMethod)}
                  >
                    {sortMethod.name}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
          <CustomDateForm
            setCustomTimeInterval={setCustomTimeInterval}
            onStartTimeChange={onStartTimeChange}
          />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FilterMenu;
