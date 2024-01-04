import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import React from "react";

const ActionsButton = ({
  handleEditIcon,
  handleDeleteIcon,
  visibleIcon,
  customer,
}) => {
  return (
    <div className="actionsButton">
      <IconButton size="small" onClick={handleEditIcon}>
        {visibleIcon ? (
          <VisibilityIcon fontSize="small" />
        ) : (
          <ModeEditIcon fontSize="small" />
        )}
      </IconButton>

      <IconButton disabled={customer} size="small" onClick={handleDeleteIcon}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};
export default ActionsButton;
