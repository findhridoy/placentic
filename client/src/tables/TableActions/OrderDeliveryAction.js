import { yupResolver } from "@hookform/resolvers/yup";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Modal } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateOrderMutation } from "../../app/features/orders/orderApi";
import UpdateOrderForm from "../../dashboard/DashboardComponents/UpdateOrderForm";
import { deliveryStatusSchema } from "../../helpers/Validation/ValidationSchema";

const OrderDeliveryAction = ({ row, customer }) => {
  // Modal state
  const [open, setOpen] = useState(false);

  // Redux element
  const [updateOrder, { isLoading, isError, error, data }] =
    useUpdateOrderMutation();

  // delivey options
  const deliveryOption = ["prepared", "completed", "deliverd", "canceled"];

  // React hook form own state
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(deliveryStatusSchema),
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
      cogoToast.success("Product has been updated.");
      setOpen(false);
    }
  }, [isError, error, data, setOpen]);

  return (
    <>
      <div className="custom__chip">
        <div
          className={
            row?.original?.deliveryStatus === "prepared"
              ? "warning"
              : row?.original?.deliveryStatus === "completed"
              ? "success"
              : row?.original?.deliveryStatus === "deliverd"
              ? "info"
              : row?.original?.deliveryStatus === "canceled"
              ? "error"
              : "secondary"
          }
        >
          {row?.original?.deliveryStatus === "free" ? (
            <Button disabled={customer} size="small">
              ● Store Pickup
            </Button>
          ) : (
            <Button
              endIcon={!customer && <KeyboardArrowDownIcon />}
              size="small"
              onClick={() => setOpen(true)}
              disabled={customer}
            >
              ● {row?.original?.deliveryStatus}
            </Button>
          )}
        </div>
      </div>

      {/* Edit modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <UpdateOrderForm
            title="Update Delivery Status"
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            inputName="deliveryStatus"
            errors={errors}
            label="Delivery status"
            data={deliveryOption}
            setOpen={setOpen}
            isLoading={isLoading}
            defaultSelect={row?.original?.deliveryStatus}
          />
        </>
      </Modal>
    </>
  );
};

export default OrderDeliveryAction;
