import { Skeleton, Stack } from "@mui/material";
import React from "react";

const UserCommentSkeleton = () => {
  return (
    <Stack justifyContent="space-between" direction="row" width="100%">
      <Stack
        justifyContent="space-between"
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <Skeleton width={40} variant="circular" animation="wave" height={40} />
        <Stack>
          <Skeleton width={150} animation="wave" height={20} />
          <Skeleton width={100} animation="wave" height={25} />
        </Stack>
      </Stack>
      <Stack>
        <Skeleton width={35} variant="circular" animation="wave" height={35} />
      </Stack>
    </Stack>
  );
};

export default UserCommentSkeleton;
