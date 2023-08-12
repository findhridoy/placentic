import { Modal } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ActionButton from "../TableComponents/ActionButton";

const ProductAction = ({ row }) => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  // Redux element
  const dispatch = useDispatch();
  // const { loading, error, product } = useSelector(
  //   (state) => state.deleteProduct
  // );

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
      // dispatch(deleteProduct(id));
    }
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
      <ActionButton
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        row={row}
        loader={loader}
        loading={false}
        btnRef={btnRef}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <>{/* <EditProductForm setOpen={setOpen} row={row} /> */}</>
      </Modal>
    </>
  );
};

export default ProductAction;
