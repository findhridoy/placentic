import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/DashboardPages/Dashboard";
import DashboardCategories from "./Dashboard/DashboardPages/DashboardCategories";
import DashboardOrders from "./Dashboard/DashboardPages/DashboardOrders";
import DashboardProducts from "./Dashboard/DashboardPages/DashboardProducts";
import DashboardUsers from "./Dashboard/DashboardPages/DashboardUsers";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/products" element={<DashboardProducts />} />
        <Route path="/dashboard/orders" element={<DashboardOrders />} />
        <Route path="/dashboard/categories" element={<DashboardCategories />} />
        <Route path="/dashboard/users" element={<DashboardUsers />} />
      </Routes>
      {/* <Kursor /> */}
    </>
  );
};

export default App;
