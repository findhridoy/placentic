import { Skeleton, Stack } from "@mui/material";
import React from "react";
import ButtonSkeleton from "./ButtonSkeleton";

const ProductTabSkeleton = () => {
  return (
    <div>
      <Stack justifyContent="space-between" direction="row" spacing={1}>
        <ButtonSkeleton height={49} width="100%" />
        <ButtonSkeleton height={49} width="100%" />
        <ButtonSkeleton height={49} width="100%" />
      </Stack>

      <div className="bg__white" style={{ margin: "1.6rem 0" }}>
        <Stack justifyContent="space-between" direction="row" width="100%">
          <Stack>
            <Skeleton width={50} animation="wave" height={50} />
            <Skeleton width={150} animation="wave" height={25} />
            <Skeleton width={150} animation="wave" height={45} />
          </Stack>
          <Stack sx={{ width: "70%" }}>
            {[...Array(5).keys()].map((index) => (
              <Skeleton width="100%" animation="wave" height={25} key={index} />
            ))}
          </Stack>
        </Stack>
      </div>

      {[...Array(2).keys()].map((index) => (
        <div className="bg__white" style={{ margin: "0.7rem 0" }} key={index}>
          <Stack justifyContent="space-between" direction="row" width="100%">
            <Stack
              justifyContent="space-between"
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Skeleton
                width={40}
                variant="circular"
                animation="wave"
                height={40}
              />
              <Stack>
                <Skeleton width={150} animation="wave" height={20} />
                <Skeleton width={100} animation="wave" height={25} />
              </Stack>
            </Stack>
            <Stack>
              <Skeleton
                width={35}
                variant="circular"
                animation="wave"
                height={35}
              />
            </Stack>
          </Stack>

          <Stack
            justifyContent="space-between"
            direction="row"
            width="100%"
            alignItems="center"
          >
            <Stack width="85%">
              {[...Array(2).keys()].map((index) => (
                <Skeleton
                  width="100%"
                  animation="wave"
                  height={20}
                  key={index}
                />
              ))}
            </Stack>
            <Stack>
              <Skeleton
                height={26}
                width={120}
                animation="wave"
                variant="rectangular"
              />
            </Stack>
          </Stack>
        </div>
      ))}
    </div>
  );
};

export default ProductTabSkeleton;
