import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import ReviewComment from "./ReviewComment";
import ReviewForm from "./ReviewForm";
import ReviewGraph from "./ReviewGraph";

const ProductReview = ({ product, loading }) => {
  // Redux element
  const { userInfo } = useSelector((state) => state.userLogin);

  // find comment by user
  const userComment = product?.reviews?.find((x) => userInfo?._id === x?.user);

  return (
    <>
      <div className="productReview">
        <div className="productReview__container">
          {product?.countReviews === 0 && (
            <span className="productReview__epmty--text">
              {loading ? (
                <Skeleton width={175} animation="wave" height={30} />
              ) : (
                "There are no reviews yet."
              )}
            </span>
          )}

          {product?.reviews?.length > 0 && (
            <>
              {product?.countReviews > 0 && (
                <div className="productReview__graph">
                  <ReviewGraph product={product} loading={loading} />
                </div>
              )}

              {userComment && !userInfo?.isAdmin && (
                <ReviewComment
                  review={userComment}
                  key={userComment?._id}
                  loading={loading}
                />
              )}

              {!userInfo?.isAdmin &&
                product?.reviews
                  ?.filter((x) => x.user !== userComment?.user)
                  .map(
                    (review, index) =>
                      review?.action === "approve" && (
                        <ReviewComment
                          review={review}
                          key={index}
                          loading={loading}
                        />
                      )
                  )}

              {userInfo?.isAdmin &&
                product?.reviews?.map((review, index) => (
                  <ReviewComment
                    review={review}
                    key={index + 1}
                    product={product}
                    userInfo={userInfo}
                    loading={loading}
                  />
                ))}
            </>
          )}
          {!loading && (
            <div className="productReview__form">
              <ReviewForm product={product} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReview;
