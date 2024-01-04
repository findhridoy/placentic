import { Skeleton, Stack } from "@mui/material";

const CustomTableLoader = () => {
  return (
    <>
      <Stack>
        <Stack flexDirection="row" justifyContent="space-between">
          <Skeleton width={100} animation="wave" height={35} />
          <Skeleton variant="rectangular" width={140} height={35} />
        </Stack>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <Skeleton width="100%" animation="wave" height={55} key={index} />
        ))}

        <Stack flexDirection="row" justifyContent="space-between">
          <Skeleton width={90} animation="wave" height={30} />
          <Skeleton width={110} animation="wave" height={40} />
        </Stack>
      </Stack>
    </>
  );
};

export default CustomTableLoader;
