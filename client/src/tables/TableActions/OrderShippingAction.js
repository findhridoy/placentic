import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UpdateOrderForm from "../../dashboard/DashboardComponents/UpdateOrderForm";

const OrderShippingAction = ({ row }) => {
  // Modal state
  const [open, setOpen] = useState(false);

  const shippingOption = ["prepared", "completed", "deliverd", "canceled"];

  // React hook form own state
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(addProductSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    // console.log(data);
  };
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
              : ""
          }
        >
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            size="small"
            onClick={() => setOpen(true)}
          >
            ● {row?.original?.deliveryStatus}
          </Button>
        </div>
      </div>

      {/* Edit modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <UpdateOrderForm
            title="Update Shipping Status"
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            inputName="shippingStatus"
            errors={errors}
            label="Shipping status"
            data={shippingOption}
            setOpen={setOpen}
          />
        </>
      </Modal>
    </>
  );
};

export default OrderShippingAction;
