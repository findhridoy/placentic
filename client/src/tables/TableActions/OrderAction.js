import { Modal } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDeleteOrderMutation } from "../../app/features/orders/orderApi";
import OrderInvoice from "../../dashboard/DashboardComponents/OrderInvoice";
import ActionsButton from "../TableComponents/AdditionalComponents/ActionsButton";
import DeleteDialog from "../TableComponents/AdditionalComponents/DeleteDialog";

const OrderAction = ({ row }) => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  // Redux element
  const [deleteOrder, { isLoading, isError, error, data }] =
    useDeleteOrderMutation();

  // Table item delete functionality
  const handleDelete = async (orderId) => {
    await deleteOrder(orderId);
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (data?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (data?.success) {
      cogoToast.success("Order is deleted.");
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
