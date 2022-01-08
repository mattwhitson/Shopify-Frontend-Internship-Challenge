import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import Post from "../components/Post";
import FilterMenu from "../components/FIlterMenu";

export const getServerSideProps = async () => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  const end_time = today.toISOString().split("T")[0];
  const start_time = lastWeek.toISOString().split("T")[0];

  const response = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=o9xumx2KKN9HPICoATsDcvHmF6EYBIGWm8ToZfFJ&start_date=${start_time}&end_date=${end_time}`
  );

  return {
    props: {
      initalPictures: response.data,
    },
  };
};

export default function Home({ initalPictures }) {
  const [pictures, setPictures] = useState(initalPictures.reverse());

  console.log(pictures);
  return (
    <div className="min-h-screen w-full bg-[#DCDCDC]">
      <Head>
        <title>Spacestagram | Home</title>
      </Head>
      <div className="max-w-xl mx-auto space-y-2 pt-4 px-1 sm:px-0">
        <FilterMenu setPictures={setPictures} />
        {pictures.map((picture, index) => (
          <Post key={index} picture={picture} />
        ))}
      </div>
    </div>
  );
}
