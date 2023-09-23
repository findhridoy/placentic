import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ProductItemSkeleton = () => {
  return (
    <Stack width="100%" bgcolor="#fff" padding="0.75rem">
      <Skeleton
        width="100%"
        height={260}
        animation="wave"
        variant="rectangular"
      />
      <Stack marginTop={1}>
        <Skeleton width="100%" animation="wave" height={35} />
        <Stack justifyContent="space-between" direction="row">
          <Skeleton width={70} animation="wave" height={20} />
          <Skeleton width={110} animation="wave" height={20} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductItemSkeleton;
