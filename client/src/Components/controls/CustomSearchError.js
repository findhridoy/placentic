import React from "react";
import errorImage from "../../assets/error/not-found.jpg";

const CustomSearchError = ({ errorTitle, subtitle }) => {
  return (
    <div className="customSearchError">
      <div className="customSearchError__image">
        <img src={errorImage} alt="Error img" />
      </div>
      <h4 className="customSearchError__title">{errorTitle}</h4>
      <p className="customSearchError__subtitle">{subtitle}</p>
    </div>
  );
};

export default CustomSearchError;
