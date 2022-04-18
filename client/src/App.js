import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/DashboardPages/Dashboard";
import DashboardCategories from "./Dashboard/DashboardPages/DashboardCategories";
import DashboardOrders from "./Dashboard/DashboardPages/DashboardOrders";
import DashboardProducts from "./Dashboard/DashboardPages/DashboardProducts";
import DashboardUsers from "./Dashboard/DashboardPages/DashboardUsers";
import AdminRoutes from "./Helpers/Routes/AdminRoutes";
import PublicRoutes from "./Helpers/Routes/PublicRoutes";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/*" element={<PublicRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* Only Admin can access this pages */}
        <Route path="/dashboard/*" element={<AdminRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="categories" element={<DashboardCategories />} />
          <Route path="users" element={<DashboardUsers />} />
        </Route>
      </Routes>
      {/* <Kursor /> */}
    </>
  );
};

export default App;
