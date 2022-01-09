import Post from "./Post";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import useNextPage from "../useNextPage";
import SmallLoadingIcon from "./SmallLoadingIcon";

const Feed = ({
  data,
  currentDate,
  handleCurrentDateChange,
  handlePageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  //hook that detects when an element is in view (used to initiate loading of next page)
  const { ref, inView, entry } = useInView();

  //custom hook that handles loading state of the new page and then updates data with new page that was just loaded
  const { loading, error } = useNextPage(
    currentPage,
    currentDate,
    handleCurrentDateChange,
    handlePageChange
  );

  //updates the current page number when the bottom of the page is in view
  useEffect(() => {
    if (inView) {
      setCurrentPage(currentPage + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      {data.map((data, index) => (
        <Post key={index} data={data} />
      ))}
      {loading && <SmallLoadingIcon />}
      <div className="w-full h-6" ref={ref}></div>
    </>
  );
};

export default Feed;
