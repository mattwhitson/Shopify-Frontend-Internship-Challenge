import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { ExternalLinkIcon, HeartIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

//Component that renders each individual post
//I decided to use Cookies to have likes persist through a refresh, but obviously it would be much better to have users log in and save that data to a db
const Post = ({ data }) => {
  const [liked, setLiked] = useState(null);

  const likePost = () => {
    Cookies.set(`${data.title}`, JSON.stringify(true));
    setLiked(true);
  };

  const unlikePost = () => {
    Cookies.remove(`${data.title}`);
    setLiked(false);
  };

  useEffect(() => {
    const postIsLiked = Cookies.get(`${data.title}`);

    if (postIsLiked) {
      setLiked(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="flex flex-col sm:p-2 bg-white rounded transition-colors duration-300 ease-in-out dark:bg-[#181818] dark:text-[#f7f7f7]">
      <div className="">
        {data?.media_type === "video" ? (
          <embed
            className="mx-auto rounded w-full h-96"
            src={data.url}
            alt={data.title}
          ></embed>
        ) : (
          <img className="mx-auto rounded" src={data.url} alt={data.title} />
        )}
      </div>
      <section className="max-w-5xl mx-auto space-y-2 p-2">
        <div className="flex">
          {liked ? (
            <HeartIconFilled
              onClick={unlikePost}
              className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out text-red-500"
            />
          ) : (
            <HeartIcon
              onClick={likePost}
              className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out"
            />
          )}
          <Link href={`/post/${data.date}`} passHref>
            <a>
              <ExternalLinkIcon className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out ml-2" />
            </a>
          </Link>
          <time className="ml-auto text-sm font-semibold">{data.date}</time>
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold">{data.title}</h2>
        <p className="text-sm">{data.explanation}</p>
      </section>
    </article>
  );
};

export default Post;
