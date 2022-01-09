import Header from "./Header";

//extremely simple layout component that displays a header and wraps on the children components
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
