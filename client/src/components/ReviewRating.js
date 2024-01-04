// import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import React, { useState } from "react";

const labels = {
  0.5: "Useless",
  1: "Useless +",
  1.5: "Poor",
  2: "Poor +",
  2.5: "Ok",
  3: "Ok +",
  3.5: "Good",
  4: "Good +",
  4.5: "Excellent",
  5: "Excellent +",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ReviewRating = ({ value, setValue, errors }) => {
  const [hover, setHover] = useState(-1);

  return (
    <div
      className={errors?.rating ? "reviewRating error__icon" : "reviewRating"}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarBorderIcon />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </div>
  );
};

export default ReviewRating;
