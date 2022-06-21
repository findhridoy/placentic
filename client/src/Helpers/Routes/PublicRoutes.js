import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  // Redux
  const { userInfo } = useSelector((state) => state.userLogin);

  return !userInfo?.email ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
