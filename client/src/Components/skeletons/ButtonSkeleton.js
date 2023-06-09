import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ButtonSkeleton = ({ height, width, ...others }) => {
  return (
    <Stack {...others}>
      <Skeleton
        height={height}
        width={width}
        animation="wave"
        variant="rectangular"
      />
    </Stack>
  );
};

export default ButtonSkeleton;
