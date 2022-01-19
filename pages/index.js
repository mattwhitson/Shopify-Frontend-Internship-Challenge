import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import FilterMenu from "../components/FilterMenu";
import LoadingIcon from "../components/LoadingIcon";
import Feed from "../components/Feed";

//Fetch inital photos (1 week timeframe) from server for SSR (better SEO and everything is pre-rendered). Using getStaticProps with incremental static regeneration with a revalidation period of 6 hour
//Unfortunately, it can sometimes take a little bit to load due to NASA's API sometimes being a little slow! haha
//I decided 16 pictures was an okay number to fetch, I tried higher amounts (ex. 30 pictures) but it seemed to be too slow
export const getStaticProps = async () => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 15
  );

  const endTime = today.toISOString().split("T")[0];
  const startTime = lastWeek.toISOString().split("T")[0];

  const response = await axios
    .get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&start_date=${startTime}&end_date=${endTime}`
    )
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    props: {
      initalPictures: response,
    },
    revalidate: 60 * 21600, // revalidates every 6 hours
  };
};

export default function Home({ initalPictures }) {
  const [data, setData] = useState(initalPictures);
  const [loading, setLoading] = useState(false);
  const [customDateError, setCustomDateError] = useState(null);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  console.log(data);

  //handles updating of current date to load data from when user loads another page
  const handleCurrentDateChange = (date) => {
    setCurrentDate(date);
  };

  //handles complete data reset (i.e. when a user selects a new custom date)
  const handleDataChange = (data) => {
    setData(data);
  };

  //handles concating the current page's data with the next page's data
  const handlePageChange = (newData) => {
    setData(data.concat(newData));
  };

  //handles loading state for when new filter method is chosen (i.e. new custom date, switching from chronological to random, etc.)
  const handleLoadingChange = (state) => {
    setLoading(state);
  };

  //if a user forgets to select a date before clicking the custom date button, an error message will be displayed
  const handleDateError = (message) => {
    setCustomDateError(message);
    setTimeout(() => {
      setCustomDateError(null);
    }, 5000);
  };

  //Added meta tags for websites that support link previews!
  return (
    <main className="min-h-screen w-full bg-[#DCDCDC] darkMode-black-bg">
      <Head>
        <title>Spacestagram | Home</title>
        <meta property="og:title" content="Spacestagram" />
        <meta
          property="og:description"
          content="Photos from NASA's Astronomy Photo of the Day (APOD) API"
        />
        <meta property="og:image" content={data[0]?.url} />
        <meta name="theme-color" content="#0e0e0e" />
      </Head>
      <section className="max-w-xl mx-auto space-y-2 pt-4 px-1 sm:px-0">
        <FilterMenu
          handleDataChange={handleDataChange}
          handleLoadingChange={handleLoadingChange}
          handleDateError={handleDateError}
          handleCurrentDateChange={handleCurrentDateChange}
        />
        {loading && <LoadingIcon />}
        {customDateError && (
          <p className="text-sm text-red-500">{customDateError}</p>
        )}
        {!loading && (
          <Feed
            data={data}
            currentDate={currentDate}
            handleCurrentDateChange={handleCurrentDateChange}
            handlePageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  );
}
