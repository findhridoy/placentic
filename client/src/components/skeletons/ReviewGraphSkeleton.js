import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ReviewGraphSkeleton = () => {
  return (
    <Stack justifyContent="space-between" direction="row" width="100%">
      <Stack>
        <Skeleton width={50} animation="wave" height={50} />
        <Skeleton width={150} animation="wave" height={25} />
        <Skeleton width={150} animation="wave" height={45} />
      </Stack>
      <Stack sx={{ width: "70%" }}>
        {[...Array(5).keys()].map((index) => (
          <Skeleton width="100%" animation="wave" height={25} key={index} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ReviewGraphSkeleton;
