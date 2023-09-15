import { Skeleton, Stack } from "@mui/material";
import React from "react";

const UserInfoSkeleton = ({ size }) => {
  return (
    <Stack>
      {[...Array(size).keys()].map((index) => (
        <Skeleton
          width={`${Math.floor(Math.random() * 35) + 65}%`}
          animation="wave"
          height={20}
          key={index}
        />
      ))}
    </Stack>
  );
};

export default UserInfoSkeleton;
