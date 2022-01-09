import { useState } from "react";
import Header from "./Header";

//extremely simple layout component that displays a header and wraps on the children components
const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

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
