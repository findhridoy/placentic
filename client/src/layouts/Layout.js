import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Newsletter from "../components/Newsletter";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Newsletter />
      <Footer />
    </>
  );
};

export default Layout;
