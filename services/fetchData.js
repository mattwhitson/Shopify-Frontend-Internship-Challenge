import axios from "axios";

//Decided to utilize Nextjs API routes because that way the API keys are not accessile through the dev-tools (anyone can check out the network tab and see the request headers)
//Initial fetch via the server requires an absolute URL
export const fetchDataServerSide = (startTime, endTime) =>
  axios
    .get(
      `https://shopify-frontend-internship-challenge-mattwhitson.vercel.app/api/posts/${startTime}/${endTime}`
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));

//Client side fetching
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

export const fetchPostServerSide = (date) =>
  axios
    .get(
      `https://shopify-frontend-internship-challenge-mattwhitson.vercel.app/api/posts/${date}`
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));
