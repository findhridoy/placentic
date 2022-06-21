import { Modal } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditUserForm from "../../Dashboard/DashboardComponents/EditUserForm";
import {
  deleteUser,
  userDeleteErrorReset,
} from "../../Redux/actions/userActions";
import ActionButton from "../TableComponents/ActionButton";

const UserAction = ({ row }) => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  // Redux element
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.deleteUser);

  // Table item edit functionality
  const handleEditClick = (x) => {
    setOpen(true);
  };

  // Delete button ref
  const btnRef = useRef();

  // Table item delete functionality
  const handleDelete = (id) => {
    if (btnRef.current.click) {
      setLoader(true);
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(userDeleteErrorReset());
    }
    if (user?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(userDeleteErrorReset());
    }
    if (user?.success) {
      cogoToast.success("Category is deleted.");
      dispatch(userDeleteErrorReset());
    }
  }, [error, user, dispatch]);
  return (
    <>
      <ActionButton
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        row={row}
        loader={loader}
        loading={loading}
        btnRef={btnRef}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <EditUserForm setOpen={setOpen} row={row} />
        </>
      </Modal>
    </>
  );
};

export default UserAction;
