import { useEffect, useState } from "react";
import { fetchData } from "./services/fetchData";

const useNextPage = (
  currentPage,
  currentDate,
  handleCurrentDateChange,
  handlePageChange
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //gets new 30 day date range for next page of data, then updates the global current date which keeps track of the next page's date range
  const getNewDates = () => {
    const dateToChange = new Date(currentDate);

    const newEndDate = new Date(
      dateToChange.getFullYear(),
      dateToChange.getMonth(),
      dateToChange.getDate() - 15
    )
      .toISOString()
      .split("T")[0];

    handleCurrentDateChange(newEndDate);

    const newStartDate = new Date(
      dateToChange.getFullYear(),
      dateToChange.getMonth(),
      dateToChange.getDate() - 30
    )
      .toISOString()
      .split("T")[0];
    console.log(newStartDate, newEndDate);

    return { newStartDate, newEndDate };
  };

  //fetches next 30 days worth of data and then submit's it back to event handler in index.js
  useEffect(() => {
    if (currentPage > 1 && !loading) {
      const getNextPage = async () => {
        setLoading(true);
        const { newStartDate, newEndDate } = getNewDates();

        console.log(newStartDate, newEndDate);

        const response = await fetchData(newStartDate, newEndDate);

        handlePageChange(response.data.reverse());

        setLoading(false);
      };

      getNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return { loading, error };
};

export default useNextPage;
