import React from "react";
import ReviewForm from "./ReviewForm";

const ProductReview = ({ product }) => {
  return (
    <section className="productReview__section">
      <div className="productReview__container">
        <div className="productReview__content">
          <div className="productReview__empty">
            <h4 className="empty__text">There are no review yet.</h4>
            <span>
              <ReviewForm />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReview;
