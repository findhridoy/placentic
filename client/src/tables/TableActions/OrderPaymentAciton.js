import { yupResolver } from "@hookform/resolvers/yup";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Modal } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateOrderMutation } from "../../app/features/orders/orderApi";
import UpdateOrderForm from "../../dashboard/DashboardComponents/UpdateOrderForm";
import { paymentStatusSchema } from "../../helpers/Validation/ValidationSchema";

const OrderPaymentAciton = ({ row }) => {
  // Modal state
  const [open, setOpen] = useState(false);

  // Redux element
  const [updateOrder, { isLoading, isError, error, data }] =
    useUpdateOrderMutation();

  // payment options
  const paymentOption = ["authorized", "paid"];

  // React hook form own state
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentStatusSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    const updateData = {
      orderId: row?.original?._id,
      data,
    };
    await updateOrder(updateData);
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (data?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (data?.success) {
      cogoToast.success("Payment status has been updated.");
      setOpen(false);
    }
  }, [isError, error, data, setOpen]);
  return (
    <>
      <div className="custom__chip">
        <div
          className={
            // row?.original?.paymentStatus === "authorized"
            //   ? "warning" :
            row?.original?.paymentResult?.status === "succeeded"
              ? "success"
              : "info"
          }
        >
          <Button
            // endIcon={<KeyboardArrowDownIcon />}
            size="small"
            // onClick={() => setOpen(true)}
          >
            ● {row?.original?.paymentResult?.status}
          </Button>
        </div>
      </div>

      {/* Edit modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <UpdateOrderForm
            title="Update Payment Status"
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            inputName="paymentStatus"
            errors={errors}
            label="Payment status"
            data={paymentOption}
            setOpen={setOpen}
            isLoading={isLoading}
            defaultSelect={row?.original?.paymentStatus}
          />
        </>
      </Modal>
    </>
  );
};

export default OrderPaymentAciton;
