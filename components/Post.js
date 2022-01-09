import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

//component that renders each individual post
//I decided to use Cookies to have likes persist through a refresh, but obviously it would be much better to have users log in and save that data to a db
const Post = ({ picture }) => {
  const [liked, setLiked] = useState(null);

  const likePost = () => {
    Cookies.set(`${picture.title}`, JSON.stringify(true));
    setLiked(true);
  };

  const unlikePost = () => {
    Cookies.remove(`${picture.title}`);
    setLiked(false);
  };

  useEffect(() => {
    const postIsLiked = Cookies.get(`${picture.title}`);

    if (postIsLiked) {
      setLiked(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="flex flex-col sm:p-2 bg-white rounded">
      <div className="">
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="mx-auto rounded"
            src={picture.url}
            alt={picture.title}
          />
        }
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
          <span className="ml-auto text-sm font-semibold">{picture.date}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold">{picture.title}</h2>
        <p className="text-sm">{picture.explanation}</p>
      </section>
    </article>
  );
};

export default Post;
