import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { fetchPictures } from "../services/fetchPictures";
import CustomDateForm from "./CustomDateForm";

//simple timeframe selection menu (kind of like reddit's)
//decided to use @headlessui/react Menu because it provides some nice accessiblity features out of the box, like pressing ESC / clicking outside the menu to close and using arrow keys to navigate
const FilterMenu = ({ setPictures, setLoading }) => {
  const [currentTimeframe, setCurrentTimeframe] = useState("Past week");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  //predefined timeframes for timeframe selection menu
  const timeframes = [
    { name: "Past week", value: 7 },
    { name: "Past month", value: 30 },
    { name: "Past 6 months", value: 182 },
    { name: "Past year", value: 365 },
  ];

  //function that sets the new time range for predefined time range values
  const setTimeInterval = async (time) => {
    setLoading(true);
    //get new start date and end date for query to API
    const today = new Date();
    const prevTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - time
    );

    //convert those new dates to format YYYY-MM-DD
    const end_time = today.toISOString().split("T")[0];
    const start_time = prevTime.toISOString().split("T")[0];

    //call API and set new pictures
    const response = await fetchPictures(start_time, end_time);
    setPictures(response.data.reverse());

    setLoading(false);

    //set new current timeframe for time selection menu in order to display current time frame
    const newTimeframe = timeframes.filter(
      (timeframe) => timeframe.value === time
    );
    setCurrentTimeframe(newTimeframe[0].name);
  };

  //function to compute custom timeframe selection
  const setCustomTimeInterval = async (event) => {
    event.preventDefault();

    setLoading(true);

    const response = await fetchPictures(startTime, endTime);

    setPictures(response.data.reverse());

    setLoading(false);

    setCurrentTimeframe("Custom");
    setStartTime(null);
    setEndTime(null);
  };

  //event callback to handle end time input
  const onEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  //event callback to handle start time input
  const onStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  return (
    <Menu as="div" className="ml-auto relative">
      Posts from:
      <Menu.Button className="bg-[#f7f7f7] ml-2 py-2 px-4 rounded focus:outline-none">
        <div className="flex items-center">
          {currentTimeframe}
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
        <Menu.Items className="absolute bg-[#f7f7f7] flex flex-col ml-[82px] mt-2 p-2 space-y-1 rounded-md shadow-lg focus:outline-none">
          <div className="border-b-[1px] border-gray-200">
            {timeframes.map(
              (timeframe, index) =>
                timeframe.name !== currentTimeframe && (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <div
                        className={`${
                          active
                            ? "bg-blue-500 text-white"
                            : "bg-[#f7f7f7] text-black"
                        } p-1 rounded-sm hover:cursor-pointer`}
                        onClick={() => setTimeInterval(timeframe.value)}
                      >
                        {timeframe.name}
                      </div>
                    )}
                  </Menu.Item>
                )
            )}
          </div>
          <CustomDateForm
            setCustomTimeInterval={setCustomTimeInterval}
            onEndTimeChange={onEndTimeChange}
            onStartTimeChange={onStartTimeChange}
          />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FilterMenu;
