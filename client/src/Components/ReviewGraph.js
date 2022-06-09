import { LinearProgress } from "@mui/material";
import React from "react";
import Rating from "./Rating";

const ReviewGraph = ({ product }) => {
  return (
    <div className="reviewGraph">
      <div className="reviewGraph__rating">
        <span className="rating__text">
          {product?.ratings}
          <span className="rating__small">/5</span>
        </span>
        <span className="review__text">
          Based on {product?.countReviews} Reviews
        </span>
        <Rating ratings={product?.ratings} />
      </div>
      <div className="reviewGraph__graph">
        {[100, 75, 50, 25, 5].reverse().map((value, index) => (
          <span className="graph__progress" key={index}>
            <span className="graph__star">
              <span className="graph__count">{index + 1}</span>
              Star
            </span>
            <LinearProgress variant="determinate" value={value} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReviewGraph;
