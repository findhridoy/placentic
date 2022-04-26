import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  // Redux
  const { userInfo } = useSelector((state) => state.userLogin);

  const location = useLocation();

  return userInfo?.email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoutes;
