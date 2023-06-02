import { Alert, Avatar } from "@mui/material";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import {
  useApproveReviewMutation,
  useRemoveReviewMutation,
} from "../app/features/products/productApi";
import CommentHandler from "./CommentHandler";
import Rating from "./Rating";

const ReviewComment = ({ review, product, userInfo }) => {
  // States
  const [anchorEl, setAnchorEl] = useState(null);

  // Redux elements
  const [
    approveReview,
    { isLoading, isError, error, data },
  ] = useApproveReviewMutation();
  const [
    removeReview,
    {
      isLoading: deleteLoading,
      isError: deleteIsError,
      error: deleteError,
      data: deleteData,
    },
  ] = useRemoveReviewMutation();

  // Approve and Delete comment
  const handleMenuClick = async (action) => {
    const queryData = {
      prodId: product?._id,
      revId: review?._id,
      action,
    };
    if (action === "remove") {
      await removeReview(queryData);
    }
    if (action === "approve") {
      await approveReview(queryData);
    }
    if (action === "decline") {
      await approveReview(queryData);
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (data?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (data?.success) {
      cogoToast.success(data?.message);
    }
  }, [isError, error, data]);

  useEffect(() => {
    if (deleteIsError) {
      cogoToast.error(deleteError?.data?.message);
    }
    if (deleteData?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (deleteData?.success) {
      cogoToast.success("Review has been deleted.");
    }
  }, [deleteIsError, deleteError, deleteData]);
  return (
    <div className="reviewComment">
      <div className="reviewComment__users">
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

        {userInfo?.isAdmin && (
          <div className="reviewComment__action">
            <CommentHandler
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              handleMenuClick={handleMenuClick}
              userInfo={userInfo}
              deleteLoader={deleteLoading}
              permissionLoader={isLoading}
            />
          </div>
        )}
      </div>

      <div className="reviewComment__comment">
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
      </div>
    </div>
  );
};

export default ReviewComment;
