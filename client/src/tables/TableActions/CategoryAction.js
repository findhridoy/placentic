import { Modal } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDeleteCategoryMutation } from "../../app/features/categories/categoryApi";
import EditCategoryForm from "../../dashboard/DashboardComponents/EditCategoryForm";
import ActionsButton from "../TableComponents/AdditionalComponents/ActionsButton";
import DeleteDialog from "../TableComponents/AdditionalComponents/DeleteDialog";

const CategoryAction = ({ row }) => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  // Redux element
  const [deleteProduct, { isLoading, isError, error, data }] =
    useDeleteCategoryMutation();

  // Table item delete functionality
  const handleDelete = async (catId) => {
    await deleteProduct(catId);
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (data?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (data?.success) {
      cogoToast.success("Category is deleted.");
      setDialog(false);
    }
  }, [isError, error, data, setDialog]);
  return (
    <>
      <ActionsButton
        handleEditIcon={() => setOpen(true)}
        handleDeleteIcon={() => setDialog(true)}
        row={row}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <EditCategoryForm setOpen={setOpen} row={row} />
        </>
      </Modal>

      {/* Edit modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <EditCategoryForm setOpen={setOpen} row={row} />
        </>
      </Modal>

      {/* Delete dialog */}
      <DeleteDialog
        open={dialog}
        setOpen={setDialog}
        onClick={handleDelete}
        isLoading={isLoading}
        row={row}
      />
    </>
  );
};

export default CategoryAction;
