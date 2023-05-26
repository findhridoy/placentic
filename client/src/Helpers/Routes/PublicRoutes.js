import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  // Redux elements
  const { userInfo } = useSelector((state) => state.auth);

  return !userInfo?.email && !userInfo?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PublicRoutes;
