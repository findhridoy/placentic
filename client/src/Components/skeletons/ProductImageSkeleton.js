import { Skeleton } from "@mui/material";
import React from "react";

const ProductImageSkeleton = () => {
  return (
    <div>
      <Skeleton
        height={450}
        width="100%"
        animation="wave"
        variant="rectangular"
      />
    </div>
  );
};

export default ProductImageSkeleton;
