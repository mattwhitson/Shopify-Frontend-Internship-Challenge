import axios from "axios";

export const fetchPictures = (startTime, endTime) =>
  axios
    .get(
      `https://api.nasa.gov/planetary/apod?api_key=o9xumx2KKN9HPICoATsDcvHmF6EYBIGWm8ToZfFJ&start_date=${startTime}&end_date=${endTime}`
    )
    .then((response) => response)
    .catch((error) => console.error(error));
