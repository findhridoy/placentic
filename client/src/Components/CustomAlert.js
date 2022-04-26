import { Alert } from "@mui/material";
import React from "react";

const CustomAlert = ({ severity, message }) => {
  return (
    <div className="custom__alert">
      <Alert variant="filled" severity={severity}>
        {message}
      </Alert>
    </div>
  );
};

export default CustomAlert;
