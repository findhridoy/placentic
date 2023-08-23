import { Modal } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDeleteCategoryMutation } from "../../app/features/categories/categoryApi";
import OrderInvoice from "../../dashboard/DashboardComponents/OrderInvoice";
import ActionsButton from "../TableComponents/AdditionalComponents/ActionsButton";
import DeleteDialog from "../TableComponents/AdditionalComponents/DeleteDialog";

const OrderAction = ({ row }) => {
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
        visibleIcon={true}
      />

      {/* Edit modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <OrderInvoice setOpen={setOpen} row={row} />
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

export default OrderAction;
