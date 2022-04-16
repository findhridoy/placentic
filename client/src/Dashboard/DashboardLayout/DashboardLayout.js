import React from "react";
import DashboardHeader from "../DashboardComponents/DashboardHeader";
import DashboardMenu from "../DashboardComponents/DashboardMenu";

const DashboardLayout = ({ children, title }) => {
  return (
    <div className="dashboardLayout">
      <div className="dashboardLayout__menu">
        <DashboardMenu />
      </div>
      <div className="dashboarLayout__container">
        <DashboardHeader title={title} />
        <div className="dashboardLayout__pages">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
