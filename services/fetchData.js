import axios from "axios";

export const fetchData = (startTime, endTime) =>
  axios
    .get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_API_KEY}&start_date=${startTime}&end_date=${endTime}`
    )
    .then((response) => response)
    .catch((error) => console.error(error));
