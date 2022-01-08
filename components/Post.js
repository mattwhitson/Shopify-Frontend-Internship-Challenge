import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import { useState } from "react";

const Post = ({ picture }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex flex-col sm:p-2 bg-white rounded">
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
      <div className="max-w-5xl mx-auto space-y-2 p-2">
        <div className="flex">
          {liked ? (
            <HeartIconFilled
              onClick={() => setLiked(!liked)}
              className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out text-red-500"
            />
          ) : (
            <HeartIcon
              onClick={() => setLiked(!liked)}
              className="h-7 hover:scale-125 cursor-pointer transition-all duration-150 ease-out"
            />
          )}
          <span className="ml-auto text-sm font-semibold">{picture.date}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold">{picture.title}</h2>
        <p className="text-sm">{picture.explanation}</p>
      </div>
    </div>
  );
};

export default Post;
