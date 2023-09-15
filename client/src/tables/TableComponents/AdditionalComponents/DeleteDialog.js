// import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import CustomButton from "../../../components/controls/CustomButton";

const DeleteDialog = ({ open, setOpen, onClick, isLoading, row }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs">
      <div className="deleteDialog__error--icon">
        <HighlightOffIcon />
      </div>
      <h2>Are you sure?</h2>
      <DialogContent>
        <h4 className="deleteDialog__content">
          Do you really want to delete these records? This process cannot be
          undo.
        </h4>
      </DialogContent>
      <DialogActions>
        <div className="deleteDialog__button">
          <CustomButton
            className="btn small__btn btn__dark"
            text="No"
            onClick={() => setOpen(false)}
          />

          <CustomButton
            className="btn small__btn"
            text="Yes"
            defaultColor="error"
            onClick={() => onClick(row?.original?._id)}
            loading={isLoading}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
