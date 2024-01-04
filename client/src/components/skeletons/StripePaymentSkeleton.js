import { Skeleton, Stack } from "@mui/material";
import React from "react";

const StripePaymentSkeleton = () => {
  return (
    <Stack>
      <Skeleton width={160} animation="wave" height={25} />
      <Skeleton
        width="100%"
        animation="wave"
        height={40}
        variant="rectangular"
      />

      <Stack
        marginTop="10px"
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        gap={1}
      >
        <Stack flex={1}>
          <Skeleton width={160} animation="wave" height={25} />
          <Skeleton
            width="100%"
            animation="wave"
            height={40}
            variant="rectangular"
          />
        </Stack>

        <Stack flex={1}>
          <Skeleton width={160} animation="wave" height={25} />
          <Skeleton
            width="100%"
            animation="wave"
            height={40}
            variant="rectangular"
          />
        </Stack>
      </Stack>

      <Stack marginTop="25px">
        <Skeleton
          width="100%"
          animation="wave"
          height={40}
          variant="rectangular"
        />
      </Stack>
    </Stack>
  );
};

export default StripePaymentSkeleton;
