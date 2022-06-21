import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import React from "react";

const Rating = ({ ratings }) => {
  return (
    <div className="rating">
      <span className="rating__icon">
        {ratings >= 1 ? (
          <StarIcon />
        ) : ratings >= 0.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span className="rating__icon">
        {ratings >= 2 ? (
          <StarIcon />
        ) : ratings >= 1.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span className="rating__icon">
        {ratings >= 3 ? (
          <StarIcon />
        ) : ratings >= 2.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span className="rating__icon">
        {ratings >= 4 ? (
          <StarIcon />
        ) : ratings >= 3.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span className="rating__icon">
        {ratings >= 5 ? (
          <StarIcon />
        ) : ratings >= 4.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
    </div>
  );
};
export default Rating;
