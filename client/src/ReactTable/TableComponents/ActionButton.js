import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { CircularProgress, IconButton, Stack } from "@mui/material";
import React from "react";

const ActionButton = ({
  handleEditClick,
  handleDelete,
  row,
  loader,
  loading,
  btnRef,
}) => {
  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          size="small"
          color="info"
          onClick={(x) => handleEditClick(x)}
        >
          <ModeEditIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          color="error"
          onClick={() => handleDelete(row.values._id)}
          ref={btnRef}
          disabled={loader && loading}
        >
          {loader && loading ? (
            <CircularProgress color="inherit" size={20} thickness={3} />
          ) : (
            <DeleteIcon fontSize="small" />
          )}
        </IconButton>
      </Stack>
    </>
  );
};

export default ActionButton;
