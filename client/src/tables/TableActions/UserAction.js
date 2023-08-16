import { Modal } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDeleteUserMutation } from "../../app/features/users/userApi";
import EditUserForm from "../../dashboard/DashboardComponents/EditUserForm";
import ActionsButton from "../TableComponents/AdditionalComponents/ActionsButton";
import DeleteDialog from "../TableComponents/AdditionalComponents/DeleteDialog";

const UserAction = ({ row }) => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  // Redux element
  const [deleteUser, { isLoading, isError, error, data }] =
    useDeleteUserMutation();

  // Table item delete functionality
  const handleDelete = async (userId) => {
    await deleteUser(userId);
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (data?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (data?.success) {
      cogoToast.success("User is deleted.");
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
          <EditUserForm setOpen={setOpen} row={row} />
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

export default UserAction;
