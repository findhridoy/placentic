import { Modal } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDeleteProductMutation } from "../../app/features/products/productApi";
import EditProductForm from "../../dashboard/DashboardComponents/EditProductFrom";
import ActionsButton from "../TableComponents/AdditionalComponents/ActionsButton";
import DeleteDialog from "../TableComponents/AdditionalComponents/DeleteDialog";

const ProductAction = ({ row }) => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  // Redux element
  const [deleteProduct, { isLoading, isError, error, data }] =
    useDeleteProductMutation();

  // Table item delete functionality
  const handleDelete = async (prodId) => {
    await deleteProduct(prodId);
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (data?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (data?.success) {
      cogoToast.success("Product is deleted.");
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

      {/* Edit modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <EditProductForm setOpen={setOpen} row={row} />
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

export default ProductAction;
