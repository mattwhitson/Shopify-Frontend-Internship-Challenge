//Small loading icon to signify the next page of data is loading
const SmallLoadingIcon = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-12 w-12 text-blue-600 "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default SmallLoadingIcon;
