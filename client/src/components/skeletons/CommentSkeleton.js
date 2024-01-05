import { Skeleton, Stack } from "@mui/material";
import React from "react";

const CommentSkeleton = () => {
  return (
    <Stack
      justifyContent="space-between"
      direction="row"
      width="100%"
      alignItems="center"
    >
      <Stack width="85%">
        {[...Array(2).keys()].map((index) => (
          <Skeleton width="100%" animation="wave" height={20} key={index} />
        ))}
      </Stack>
      <Stack>
        <Skeleton
          height={26}
          width={120}
          animation="wave"
          variant="rectangular"
        />
      </Stack>
    </Stack>
  );
};

export default CommentSkeleton;
