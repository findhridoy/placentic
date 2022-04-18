import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoutes = () => {
  // Redux
  const { userInfo } = useSelector((state) => state.userLogin);

  const location = useLocation();

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default AdminRoutes;
