import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

const FilterMenu = ({ setPictures }) => {
  const [currentTimeframe, setCurrentTimeframe] = useState("Past week");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  console.log("hi");

  const timeframes = ["Past week", "Past month", "Past 6 months", "Past year"];

  const setTimeInterval = async (time) => {
    if (time) {
      const today = new Date();
      const prevTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - time
      );

      const end_time = today.toISOString().split("T")[0];
      const start_time = prevTime.toISOString().split("T")[0];

      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=o9xumx2KKN9HPICoATsDcvHmF6EYBIGWm8ToZfFJ&start_date=${start_time}&end_date=${end_time}`
      );

      setPictures(response.data.reverse());
    }
  };

  const setCustomTimeInterval = async (event) => {
    event.preventDefault();

    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=o9xumx2KKN9HPICoATsDcvHmF6EYBIGWm8ToZfFJ&start_date=${startTime}&end_date=${endTime}`
    );

    setPictures(response.data.reverse());

    setStartTime(null);
    setEndTime(null);
  };

  const test = (event) => {
    event.preventDefault();
    console.log("success");
  };

  return (
    <Menu as="div" className="ml-auto relative">
      Posts from:
      <Menu.Button className="bg-[#f7f7f7] ml-2 py-2 px-4 rounded focus:outline-none">
        <div className="flex items-center">
          Past week
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
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active
                      ? "bg-blue-500 text-white"
                      : "bg-[#f7f7f7] text-black"
                  } p-1 rounded-sm hover:cursor-pointer`}
                  onClick={() => setTimeInterval(30)}
                >
                  Past month
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active
                      ? "bg-blue-500 text-white"
                      : "bg-[#f7f7f7] text-black"
                  } p-1 rounded-sm hover:cursor-pointer`}
                  onClick={() => setTimeInterval(180)}
                >
                  Past 6 months
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active
                      ? "bg-blue-500 text-white"
                      : "bg-[#f7f7f7] text-black"
                  } p-1 rounded-sm hover:cursor-pointer`}
                  onClick={() => setTimeInterval(365)}
                >
                  Past year
                </div>
              )}
            </Menu.Item>
          </div>
          <form>
            <p className="text-sm font-semibold mb-2">Custom Time Range</p>
            <div className="hidden sm:flex items-baseline justify-between mr-[50%] text-sm font-semibold">
              <span>From:</span>
              <span>To:</span>
            </div>
            <input
              type="date"
              className="hidden sm:inline-block bg-[#f7f7f7] text-black
           p-1 rounded-sm hover:cursor-pointer"
            />
            <input
              type="date"
              className="hidden sm:inline-block bg-[#f7f7f7] text-black
            p-1 rounded-sm hover:cursor-pointer"
            />
            <div className="flex items-center justify-between sm:hidden">
              <span className="text-sm font-semibold">From:</span>
              <input
                type="date"
                className="bg-[#f7f7f7] text-black
           p-1 rounded-sm hover:cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between sm:hidden">
              <span className="text-sm font-semibold">To:</span>
              <input
                type="date"
                className="bg-[#f7f7f7] text-black
            p-1 rounded-sm hover:cursor-pointer"
              />
            </div>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-500 text-white" : "text-black"
                  } block mt-1 py-2 px-4 rounded-sm hover:cursor-pointer`}
                  onClick={test}
                >
                  Set Custom Time
                </button>
              )}
            </Menu.Item>
          </form>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FilterMenu;
