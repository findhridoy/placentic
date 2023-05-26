import { Button, CircularProgress } from "@mui/material";
import React from "react";

const CustomButton = ({
  onClick,
  className,
  color,
  defaultColor,
  loading,
  size,
  text,
  startIcon,
  endIcon,
  ...others
}) => {
  return (
    <div className={`${className}`}>
      {loading ? (
        // **Loading Button
        <Button
          onClick={onClick}
          disabled={loading}
          size={size}
          color={defaultColor}
          variant="contained"
          startIcon={!loading && startIcon}
          endIcon={!loading && endIcon}
          {...others}
        >
          {loading ? (
            <CircularProgress color="inherit" size={22} thickness={3} />
          ) : (
            { text }
          )}
        </Button>
      ) : (
        // **Normal Button
        <Button
          type="button"
          size={size}
          onClick={onClick}
          color={defaultColor}
          variant="contained"
          startIcon={startIcon}
          endIcon={endIcon}
          {...others}
        >
          {text}
        </Button>
      )}
    </div>
  );
};

export default CustomButton;
