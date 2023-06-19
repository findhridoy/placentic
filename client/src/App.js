import { Route, Routes } from "react-router-dom";
import CustomLoader from "./components/controls/CustomLoader";
import PrivateRoutes from "./helpers/Routes/PrivateRoutes";
import PublicRoutes from "./helpers/Routes/PublicRoutes";
import useAuthCheck from "./hooks/useAuthCheck";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const App = () => {
  // Check user authentication
  const authCheckd = useAuthCheck();

  return !authCheckd ? (
    <CustomLoader size={36} />
  ) : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:prodId" element={<Product />} />
      <Route path="/shop/cart" element={<Cart />} />
      <Route path="/shop/collection" element={<Collection />} />

      {/* Public Routes */}
      <Route path="/*" element={<PublicRoutes />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* Private Routes */}
      <Route path="/*" element={<PrivateRoutes />}>
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* Only Admin can access this pages */}
      {/* <Route path="/dashboard/*" element={<AdminRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="categories" element={<DashboardCategories />} />
          <Route path="users" element={<DashboardUsers />} />
        </Route> */}
      {/* <Kursor /> */}
    </Routes>
  );
};

export default App;
