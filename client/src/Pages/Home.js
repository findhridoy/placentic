import React from "react";
import Category from "../Components/Category";
import Hero from "../Components/Hero";
import Newsletter from "../Components/Newsletter";
import Products from "../Components/Products";
import Layout from "../Layouts/Layout";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Category />
      <Products />
      <Newsletter />
    </Layout>
  );
};

export default Home;
