import axios from "axios";
import Head from "next/head";

export const getServerSideProps = async (context) => {
  const date = context.params.post;

  const response = await axios
    .get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=${date}`
    )
    .then((res) => res.data)
    .catch((error) => console.error(error));

  return {
    props: {
      post: response || null,
    },
  };
};

//Decided to add meta tags so if someone links the page on a website that supports it they'll get a nice link preview of the photo in question!
const Post = ({ post }) => {
  return (
    <main className="min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] w-full transition-colors duration-300 ease-in-out dark:bg-[#161616] dark:text-[#f7f7f7]">
      <Head>
        <title>Spacestagram | {post.title}</title>
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content="A photo from NASA's Astronomy Photo of the Day (APOD) API"
        />
        <meta property="og:image" content={post.url} />
        {post.media_type === "video" && (
          <meta property="og:video" content={post.url} />
        )}
      </Head>
      <div className="grid grid-cols-1 xl:grid-cols-4 xl:max-w-[1500px] mx-auto sm:pt-4 dark:shadow-2xl ">
        <section className="col-span-1 xl:col-span-3 shadow-2xl">
          {post.media_type === "image" ? (
            <img src={post.hdurl} alt="" className="xl:rounded-l-md" />
          ) : (
            <div className="relative h-full pb-[50%] xl:pb-[1%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full xl:rounded-l-md"
                src={post.url}
              ></iframe>
            </div>
          )}
        </section>
        <section className="col-span-1 p-4 rounded-r-md bg-[#f7f7f7] dark:bg-[#161616] sm:dark:bg-[#1a1a1a] space-y-2 shadow-2xl dark:shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-semibold">{post.title}</h2>
          <time className="text-sm font-semibold">{post.date}</time>
          {post.copyright && (
            <p className="text-sm  font-semibold dark:text-[#f7f7f7]">
              Photo By:{" "}
              <span className="text-sm italic font-semibold dark:text-[#f7f7f7]">
                {post.copyright}
              </span>
            </p>
          )}
          <p className="text-sm sm:text-base">{post.explanation}</p>
        </section>
      </div>
    </main>
  );
};

export default Post;
