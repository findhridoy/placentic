import { CircularProgress } from "@mui/material";
import React from "react";

const CustomLoader = ({ size }) => {
  return (
    <div className="customLoader">
      <CircularProgress color="inherit" size={size} thickness={4} />
    </div>
  );
};

export default CustomLoader;
