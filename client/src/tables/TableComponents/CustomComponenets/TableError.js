import React from "react";
import errorImage from "../../../assets/error/not-found.jpg";

const TableError = ({ errorTitle, subtitle }) => {
  return (
    <div className="tableError">
      <div className="tableError__image">
        <img src={errorImage} alt="Error img" />
      </div>
      <h4 className="tableError__title">{errorTitle}</h4>
      <p className="tableError__subtitle">{subtitle}</p>
    </div>
  );
};

export default TableError;
