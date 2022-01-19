import axios from "axios";

//Decided to utilize Nextjs API routes because that way the API keys are not accessile through the dev-tools (anyone can check out the network tab and see the request headers)
export const fetchData = (startTime, endTime) =>
  axios
    .get(`/api/posts/${startTime}/${endTime}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const fetchRandomData = () =>
  axios
    .get(`/api/posts/random`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
