import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton } from "@mui/material";
import React from "react";

const ActionsButton = ({ handleEditIcon, handleDeleteIcon, row }) => {
  return (
    <div className="actionsButton">
      <IconButton size="small" onClick={handleEditIcon}>
        <ModeEditIcon fontSize="small" />
      </IconButton>

      <IconButton size="small" onClick={handleDeleteIcon}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};
export default ActionsButton;
