import { useSnackbar } from "notistack";
import React from "react";

const CustomToast = ({ message, variant }) => {
  console.log(message, variant);
  // notistack toust
  const { enqueueSnackbar } = useSnackbar();
  return (
    <>
      {enqueueSnackbar(message, {
        variant: variant,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      })}
    </>
  );
};

export default CustomToast;
