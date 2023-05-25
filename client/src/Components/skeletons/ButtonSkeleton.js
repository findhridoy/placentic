import { Skeleton } from "@mui/material";
import React from "react";

const ButtonSkeleton = ({ height, width }) => {
  return (
    <Skeleton
      height={height}
      width={width}
      animation="wave"
      variant="rectangular"
    />
  );
};

export default ButtonSkeleton;
