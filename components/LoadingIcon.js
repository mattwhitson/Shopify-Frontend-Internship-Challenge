const LoadingIcon = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] w-full bg-[#DCDCDC]">
      <div className="min-h-[30vh] sm:min-h-[25vh]">
        <svg
          className="animate-spin h-32 w-32 text-blue-600 "
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
    </div>
  );
};

export default LoadingIcon;
