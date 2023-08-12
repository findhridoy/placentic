import { Box, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import React, { useState } from "react";
import CustomButton from "../../components/controls/CustomButton";

const MenuButton = ({
  buttonText,
  buttonIconComponent,
  resetHandler,
  resetText,
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="productFilter">
      <>
        <CustomButton
          className="table__button btn small__btn btn__white"
          text={buttonText}
          startIcon={buttonIconComponent}
          onClick={handleClick}
        />
        <div className="mobile__button btn__white">
          <IconButton onClick={handleClick}>{buttonIconComponent}</IconButton>
        </div>
      </>

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
            maxHeight: 75 * 5,
            width: "35ch",
            marginTop: 3,
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {children}

        <Box padding="0.4rem 1.4rem">
          {/* <CustomButton
            className="table__button btn small__btn btn__dark"
            text="Apply"
            onClick={applyHandler}
          /> */}
          <CustomButton
            className="table__button btn small__btn btn__dark outline__dark"
            text={resetText}
            onClick={resetHandler}
          />
        </Box>
      </Menu>
    </div>
  );
};

export default MenuButton;
