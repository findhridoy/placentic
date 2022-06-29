import Category from "../Components/Category";
import Hero from "../Components/Hero";
import Products from "../Components/Products";
import Layout from "../Layouts/Layout";

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
