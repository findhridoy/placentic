import Category from "../components/Category";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Layout from "../layouts/Layout";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Category />
      <Products />
    </Layout>
  );
};

export default Home;
