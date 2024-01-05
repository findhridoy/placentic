import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";
import Layout from "../layouts/Layout";

const Home = () => {
  return (
    <Layout>
      <Banner />
      {/* <Hero /> */}
      <Category />
      <Products />
    </Layout>
  );
};

export default Home;
