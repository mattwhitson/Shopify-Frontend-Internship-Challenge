import { useState } from "react";
import Header from "./Header";

//Extremely simple layout component that displays a header and wraps on the children components
const Layout = ({ children }) => {
  //Set dark mode to true by default
  const [darkMode, setDarkMode] = useState(true);

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode && "dark"}`}>
      <Header handleDarkModeChange={handleDarkModeChange} darkMode={darkMode} />
      {children}
    </div>
  );
};

export default Layout;
