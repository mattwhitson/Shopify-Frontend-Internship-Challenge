import { useEffect, useState } from "react";
import { fetchData, fetchRandomData } from "../services/fetchData";
import moment from "moment-timezone";
moment.tz.add("America/New_York|EST EDT EWT EPT|50 40 40 40");

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
    //Decided to use the moment-timezone library with EST timezone setting because that is roughly when NASA uploads their new photos (12am EST) and it will avoid duplicate posts depending on someone's timezone!
    const dateToChange = moment(new Date(currentDate)).tz("EST").format();

    const newCurrentDate = moment(dateToChange)
      .subtract(16, "days")
      .tz("EST")
      .format();
    const newEndDate = moment(dateToChange)
      .subtract(16, "days")
      .tz("EST")
      .format("YYYY-MM-DD");
    const newStartDate = moment(newEndDate)
      .subtract(15, "days")
      .tz("EST")
      .format("YYYY-MM-DD");

    handleCurrentDateChange(newCurrentDate);

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
