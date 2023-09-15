import React from "react";

const FilterLayout = ({ title, children }) => {
  return (
    <div className="filterLayout">
      <h3 className="filterLayout__title">{title}</h3>
      <div className="filterLyout__data">{children}</div>
    </div>
  );
};

export default FilterLayout;
