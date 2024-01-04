import React from "react";
import DashboardHeader from "../DashboardComponents/DashboardHeader";
import DashboardMenu from "../DashboardComponents/DashboardMenu";

const DashboardLayout = ({ children, title, filter, setFilter }) => {
  return (
    <div className="dashboardLayout">
      <DashboardMenu />
      <div className="dashboarLayout__container">
        <DashboardHeader title={title} filter={filter} setFilter={setFilter} />
        <div className="dashboardLayout__pages">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
