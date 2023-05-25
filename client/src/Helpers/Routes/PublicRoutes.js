import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  // Redux
  // const { userInfo } = useSelector((state) => state.userLogin);

  const userInfo = { email: "" };

  return !userInfo?.email ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
