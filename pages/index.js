import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import FilterMenu from "../components/FilterMenu";
import LoadingIcon from "../components/LoadingIcon";
import { fetchData } from "../services/fetchData";
import Feed from "../components/Feed";

//fetch inital photos (1 week timeframe) from server for SSR (better SEO and everything is pre-rendered). Using getStaticProps with incremental static regeneration with a revalidation period of 1 hour
export const getStaticProps = async () => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 15
  );

  const endTime = today.toISOString().split("T")[0];
  const startTime = lastWeek.toISOString().split("T")[0];

  const response = await fetchData(startTime, endTime);

  return {
    props: {
      initalPictures: response.data,
    },
    revalidate: 60 * 3600, // revalidates every hour
  };
};

export default function Home({ initalPictures }) {
  const [data, setData] = useState(initalPictures.reverse());
  const [loading, setLoading] = useState(false);
  const [customDateError, setCustomDateError] = useState(null);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  //handles updating of current date to load data from when user loads another page
  const handleCurrentDateChange = (date) => {
    setCurrentDate(date);
  };

  //handles complete data reset (i.e. when a user selects a new custom date)
  const handleDataChange = (data) => {
    setData(data);
    setCurrentDate(new Date().toISOString().split("T")[0]);
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

  console.log(data);

  return (
    <main className="min-h-screen w-full bg-[#DCDCDC] darkMode-black-bg">
      <Head>
        <title>Spacestagram | Home</title>
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
