import { Alert, Avatar, Skeleton, Stack } from "@mui/material";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductReview,
  deleteProductReviewReset,
  permissionProductReview,
  permissionProductReviewReset,
} from "../App/actions/productActions";
import CommentHandler from "./CommentHandler";
import Rating from "./Rating";

const ReviewComment = ({ review, product, userInfo, loading }) => {
  // States
  const [anchorEl, setAnchorEl] = useState(null);

  // Redux element
  const dispatch = useDispatch();
  const { loading: deleteLoader, error, review: reviews } = useSelector(
    (state) => state.deleteProductReview
  );
  const {
    loading: permissionLoader,
    error: approveError,
    review: arrpoveReviews,
  } = useSelector((state) => state.permissionProductReview);

  // Delete comment
  const handleMenuClick = (key) => {
    if (key === "remove") {
      dispatch(deleteProductReview(product?._id, review?._id));
    }
    if (key === "approve") {
      dispatch(permissionProductReview(product?._id, review?._id, key));
    }
    if (key === "decline") {
      dispatch(permissionProductReview(product?._id, review?._id, key));
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(deleteProductReviewReset());
    }
    if (reviews?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(deleteProductReviewReset());
    }
    if (reviews?.success) {
      cogoToast.success("Your review has been deleted.");
      dispatch(deleteProductReviewReset());
    }
  }, [error, dispatch, reviews]);

  useEffect(() => {
    if (approveError) {
      cogoToast.error(approveError);
      dispatch(permissionProductReviewReset());
    }
    if (arrpoveReviews?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(permissionProductReviewReset());
    }
    if (arrpoveReviews?.success) {
      cogoToast.success(arrpoveReviews?.message);
      dispatch(permissionProductReviewReset());
    }
  }, [approveError, dispatch, arrpoveReviews]);
  return (
    <div className="reviewComment">
      <div className="reviewComment__users">
        {loading ? (
          <>
            <Stack
              justifyContent="space-between"
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Skeleton
                width={40}
                variant="circular"
                animation="wave"
                height={40}
              />
              <Stack>
                <Skeleton width={150} animation="wave" height={20} />
                <Skeleton width={100} animation="wave" height={25} />
              </Stack>
            </Stack>
            <Stack>
              <Skeleton
                width={35}
                variant="circular"
                animation="wave"
                height={35}
              />
            </Stack>
          </>
        ) : (
          <>
            <div className="users__info">
              <Avatar
                sx={{ width: 40, height: 40 }}
                alt={review?.name}
                src={review?.avatar}
              />
              <div className="users__details">
                <h4 className="users__name">
                  {review?.name},{" "}
                  <span className="comment__time">
                    <Moment fromNow>{review?.createdAt}</Moment>
                  </span>
                </h4>

                <div className="reviewComment__rating">
                  <Rating ratings={review?.rating} />
                </div>
              </div>
            </div>

            <div className="reviewComment__action">
              <CommentHandler
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleMenuClick={handleMenuClick}
                userInfo={userInfo}
                deleteLoader={deleteLoader}
                permissionLoader={permissionLoader}
              />
            </div>
          </>
        )}
      </div>

      <div className="reviewComment__comment">
        {loading ? (
          <>
            <Stack sx={{ width: "100%" }}>
              {[1, 2].map((index) => (
                <Skeleton
                  width="100%"
                  animation="wave"
                  height={20}
                  key={index}
                />
              ))}
            </Stack>
            <Stack>
              <Skeleton
                height={32}
                width={120}
                animation="wave"
                variant="rectangular"
              />
            </Stack>
          </>
        ) : (
          <>
            <span className="comment__text">
              {review?.action === "approve" || userInfo?.isAdmin
                ? review?.comment
                : review?.action === "decline"
                ? "Your comment was decline!"
                : review?.action === "waiting"
                ? "Your comment is waiting for approval."
                : ""}
            </span>

            {userInfo?.isAdmin && (
              <div className="reviewComment__action">
                {review?.action === "approve" ? (
                  <Alert severity="success" fontSize="small">
                    Approved
                  </Alert>
                ) : review?.action === "decline" ? (
                  <Alert severity="error">Declined</Alert>
                ) : review?.action === "waiting" ? (
                  <Alert severity="warning">Panding</Alert>
                ) : (
                  " "
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewComment;
