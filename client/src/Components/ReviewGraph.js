import { LinearProgress } from "@mui/material";
import Rating from "./Rating";

const ReviewGraph = ({ product }) => {
  const reviewsValue = [
    {
      title: "Excellent",
      value: 100,
    },
    {
      title: "Good",
      value: 75,
    },
    {
      title: "Average",
      value: 50,
    },
    {
      title: "Below Average",
      value: 25,
    },
    {
      title: "Poor",
      value: 5,
    },
  ];
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
        {reviewsValue?.map((review, index) => (
          <span className="graph__progress" key={index}>
            <span className="graph__text">{review?.title}</span>
            <LinearProgress variant="determinate" value={review?.value} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReviewGraph;
