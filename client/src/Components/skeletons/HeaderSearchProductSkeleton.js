import { Skeleton, Stack } from "@mui/material";
import React from "react";

const HeaderSearchProductSkeleton = () => {
  return (
    <Stack>
      {[...Array(7).keys()].map((index) => (
        <Stack
          key={index}
          display="flex"
          flexDirection="row"
          gap={3}
          borderBottom={1}
          borderBottomColor="#c2c2c2"
          padding="0.5rem 0"
          sx={{
            ":first-child": { paddingTop: 0 },
            ":last-child": { border: "none", paddingBottom: 0 },
          }}
        >
          <Stack>
            <Skeleton height={50} width="50px" variant="rectangular" />
          </Stack>

          <Stack flex={1} gap={1}>
            <Skeleton width="100%" height={18} variant="rectangular" />
            <Skeleton width="20%" height={12} variant="rectangular" />
          </Stack>

          <Stack gap={1}>
            <Skeleton width="150px" height={16} variant="rectangular" />
            <Skeleton width="100px" height={12} variant="rectangular" />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default HeaderSearchProductSkeleton;
