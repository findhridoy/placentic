import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  // Redux elements
  const { userInfo } = useSelector((state) => state.auth);

  // Remember url location
  const location = useLocation();

  return userInfo?.email && userInfo?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoutes;
