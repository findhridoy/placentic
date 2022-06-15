import { LinearProgress, Skeleton, Stack } from "@mui/material";
import Rating from "./Rating";

const ReviewGraph = ({ product, loading }) => {
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
      {loading ? (
        <>
          <Stack>
            <Skeleton width={50} animation="wave" height={50} />
            <Skeleton width={150} animation="wave" height={25} />
            <Skeleton width={150} animation="wave" height={45} />
          </Stack>
          <Stack sx={{ width: "70%" }}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Skeleton width="100%" animation="wave" height={25} key={index} />
            ))}
          </Stack>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ReviewGraph;
