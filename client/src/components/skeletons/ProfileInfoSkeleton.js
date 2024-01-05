import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ProfileInfoSkeleton = () => {
  return (
    <div>
      <Skeleton variant="circular" animation="wave" width={150} height={150} />
      <Stack margin="0.8rem 0">
        <Skeleton width="100%" animation="wave" height={60} />
      </Stack>

      {[...Array(5).keys()].map((index) => (
        <Skeleton width="100%" animation="wave" height={40} key={index} />
      ))}
      <Stack marginTop={2}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={48}
        />
      </Stack>
    </div>
  );
};

export default ProfileInfoSkeleton;
