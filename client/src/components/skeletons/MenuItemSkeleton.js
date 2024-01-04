import { Skeleton, Stack } from "@mui/material";
import React from "react";

const MenuItemSkeleton = () => {
  return (
    <Stack width="100%" gap={0.6}>
      {[...Array(6).keys()].map((index) => (
        <Skeleton
          width="100%"
          height={28}
          animation="wave"
          variant="rectangular"
          key={index}
        />
      ))}
    </Stack>
  );
};

export default MenuItemSkeleton;
