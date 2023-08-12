import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoutes = () => {
  // Redux elements
  const { userInfo } = useSelector((state) => state.auth);

  // Remember url location
  const location = useLocation();

  return userInfo?.email && userInfo?.token && userInfo?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location?.pathname }} replace />
  );
};

export default AdminRoutes;
