import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton, Modal, Stack } from "@mui/material";
import React, { useState } from "react";
import EditCategoryForm from "../../Dashboard/DashboardComponents/EditCategoryForm";

const TableActions = ({ row, category }) => {
  // Modal state
  const [open, setOpen] = useState(false);

  // Table item edit functionality
  const handleEditClick = () => {
    setOpen(true);
  };

  // Table item delete functionality
  const handleDelete = (id) => {
    // delete
  };
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
          onClick={() => handleEditClick(row.values.slug)}
        >
          <ModeEditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => handleDelete(row.values._id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Modal open={open} onClose={() => setOpen(false)}>
        <>{category && <EditCategoryForm setOpen={setOpen} row={row} />}</>
      </Modal>
    </>
  );
};

export default TableActions;
