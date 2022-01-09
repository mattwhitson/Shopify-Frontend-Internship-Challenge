import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import FilterMenu from "../components/FilterMenu";
import LoadingIcon from "../components/LoadingIcon";
import { fetchData } from "../services/fetchData";

//fetch inital photos (1 week timeframe) from server for SSR (better SEO and everything is pre-rendered). Using getStaticProps with incremental static regeneration with a revalidation period of 1 hour
export const getStaticProps = async () => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
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

  const handleDataChange = (data) => {
    setData(data);
  };

  const handleLoadingChange = (state) => {
    setLoading(state);
  };

  const handleDateError = (message) => {
    setCustomDateError(message);
    setTimeout(() => {
      setCustomDateError(null);
    }, 5000);
  };
  return (
    <main className="min-h-screen w-full bg-[#DCDCDC]">
      <Head>
        <title>Spacestagram | Home</title>
      </Head>
      <section className="max-w-xl mx-auto space-y-2 pt-4 px-1 sm:px-0">
        {loading && <LoadingIcon />}
        <FilterMenu
          handleDataChange={handleDataChange}
          handleLoadingChange={handleLoadingChange}
          handleDateError={handleDateError}
        />
        {customDateError && (
          <p className="text-sm text-red-500">{customDateError}</p>
        )}
        {!loading && (
          <>
            {data.map((data, index) => (
              <Post key={index} data={data} />
            ))}
          </>
        )}
      </section>
    </main>
  );
}
