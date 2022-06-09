import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewGraph from "./ReviewGraph";

const ProductReview = ({ product }) => {
  return (
    <>
      <div className="productReview">
        <div className="productReview__container">
          {product?.countReviews > 0 ? (
            <div className="productReview__graph">
              <ReviewGraph product={product} />
            </div>
          ) : (
            <span className="productReview__epmty--text">
              There are no reviews yet.
            </span>
          )}

          <div className="productReview__form">
            <ReviewForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReview;
