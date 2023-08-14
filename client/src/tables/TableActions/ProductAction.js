import { Modal } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ActionsButton from "../TableComponents/AdditionalComponents/ActionsButton";
import DeleteDialog from "../TableComponents/AdditionalComponents/DeleteDialog";

const ProductAction = ({ row }) => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  // Redux element
  const dispatch = useDispatch();
  // const { loading, error, product } = useSelector(
  //   (state) => state.deleteProduct
  // );

  // Table item edit functionality
  const handleEditClick = (x) => {
    setOpen(true);
  };

  // Table item delete functionality
  const handleDelete = (id) => {
    setDialog(true);
  };

  // useEffect(() => {
  //   if (error) {
  //     cogoToast.error(error);
  //     dispatch(productDeleteReset());
  //   }
  //   if (product?.message) {
  //     cogoToast.error("Something was wrong!");
  //     dispatch(productDeleteReset());
  //   }
  //   if (product?.success) {
  //     cogoToast.success("Product is deleted.");
  //     dispatch(productDeleteReset());
  //   }
  // }, [error, product, dispatch]);
  return (
    <>
      <ActionsButton
        handleEdit={handleEditClick}
        handleDelete={handleDelete}
        row={row}
      />

      {/* Edit modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <>{/* <EditProductForm setOpen={setOpen} row={row} /> */}</>
      </Modal>

      {/* Delete dialog */}
      <DeleteDialog open={dialog} setOpen={setDialog} row={row} />
    </>
  );
};

export default ProductAction;
