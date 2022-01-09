import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import FilterMenu from "../components/FIlterMenu";
import LoadingIcon from "../components/LoadingIcon";
import { fetchPictures } from "../services/fetchPictures";

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

  const response = await fetchPictures(startTime, endTime);

  return {
    props: {
      initalPictures: response.data,
    },
    revalidate: 60 * 3600, // revalidates every hour
  };
};

export default function Home({ initalPictures }) {
  const [pictures, setPictures] = useState(initalPictures.reverse());
  const [loading, setLoading] = useState(null);

  return (
    <main className="min-h-screen w-full bg-[#DCDCDC]">
      <Head>
        <title>Spacestagram | Home</title>
      </Head>
      <div className="max-w-xl mx-auto space-y-2 pt-4 px-1 sm:px-0">
        {loading && <LoadingIcon />}
        <FilterMenu setPictures={setPictures} setLoading={setLoading} />
        {!loading && (
          <>
            {pictures.map((picture, index) => (
              <Post key={index} picture={picture} />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
