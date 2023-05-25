import { Modal } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryDeleteErrorReset,
  deleteCategory,
} from "../../App/actions/categoryActions";
import EditCategoryForm from "../../Dashboard/DashboardComponents/EditCategoryForm";
import ActionButton from "../TableComponents/ActionButton";

const CategoryAction = ({ row }) => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  // Redux element
  const dispatch = useDispatch();
  const { loading, error, category: categories } = useSelector(
    (state) => state.deleteCategory
  );

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
      dispatch(deleteCategory(id));
    }
  };

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(categoryDeleteErrorReset());
    }
    if (categories?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(categoryDeleteErrorReset());
    }
    if (categories?.success) {
      cogoToast.success("Category is deleted.");
      dispatch(categoryDeleteErrorReset());
    }
  }, [error, categories, dispatch]);
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
          <EditCategoryForm setOpen={setOpen} row={row} />
        </>
      </Modal>
    </>
  );
};

export default CategoryAction;
