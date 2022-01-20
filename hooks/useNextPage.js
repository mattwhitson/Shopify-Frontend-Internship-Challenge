import { useEffect, useState } from "react";
import { fetchData, fetchRandomData } from "../services/fetchData";

const useNextPage = (
  currentPage,
  currentDate,
  handleCurrentDateChange,
  handlePageChange
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //Gets new 30 day date range for next page of data, then updates the global current date which keeps track of the next page's date range
  const getNewDates = () => {
    const dateTemp = new Date(currentDate);

    //compensates for current user's timezone, helps to avoid duplicates (at least for those in North America),
    //would be optimal to instead use the timezone NASA uses for uploading photos, but I'm not 100% sure what that is
    const dateToChange = new Date(
      dateTemp - new Date().getTimezoneOffset() * 60000
    );

    const newEndDate = new Date(
      dateToChange.getFullYear(),
      dateToChange.getMonth(),
      dateToChange.getDate() - 15
    )
      .toISOString()
      .slice(0, -1)
      .split("T")[0];

    handleCurrentDateChange(newEndDate);

    const newStartDate = new Date(
      dateToChange.getFullYear(),
      dateToChange.getMonth(),
      dateToChange.getDate() - 30
    )
      .toISOString()
      .slice(0, -1)
      .split("T")[0];

    return { newStartDate, newEndDate };
  };

  //Fetches next 30 days worth of data and then submit's it back to event handler in index.js if sortMethod is in Chronological Order
  //If the sortMethod is Random Order, than randomly fetch another 16 images
  useEffect(() => {
    if (currentPage > 1 && !loading) {
      const getNextPage = async () => {
        setLoading(true);
        if (currentDate) {
          const { newStartDate, newEndDate } = getNewDates();

          const response = await fetchData(newStartDate, newEndDate);
          handlePageChange(response.reverse());
        } else {
          const response = await fetchRandomData();
          handlePageChange(response);
        }

        setLoading(false);
      };

      getNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return { loading, error };
};

export default useNextPage;
