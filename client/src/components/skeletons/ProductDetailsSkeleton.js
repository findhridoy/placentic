import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <Stack>
      <Skeleton width={160} animation="wave" height={35} />
      <Skeleton width="100%" animation="wave" height={65} />
      <Skeleton width={40} animation="wave" height={40} />

      {[...Array(5).keys()].map((index) => (
        <Skeleton width="100%" animation="wave" height={20} key={index} />
      ))}

      <Stack marginTop="10px">
        <Skeleton width={115} animation="wave" height={30} />
      </Stack>
      <Stack margin="12px 0">
        <Skeleton width={70} animation="wave" height={22} />
        <Skeleton
          height={45}
          width="23%"
          animation="wave"
          variant="rectangular"
        />
      </Stack>
    </Stack>
  );
};

export default ProductDetailsSkeleton;
