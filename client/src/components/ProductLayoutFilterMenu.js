import FilterListIcon from "@mui/icons-material/FilterList";
import Menu from "@mui/material/Menu";
import React, { useState } from "react";
import CustomButton from "./controls/CustomButton";

const ProductLayoutFilterMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="productLayoutFilterMenu">
      <CustomButton
        className="productLayoutFilterMenu__btn btn small__btn btn__dark"
        text="Filter"
        endIcon={<FilterListIcon />}
        onClick={handleClick}
      />

      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            // maxHeight: 75 * 5,
            width: "260px",
            marginTop: 0,
            // height: "100%",
            paddingTop: 0,
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </div>
  );
};

export default ProductLayoutFilterMenu;
