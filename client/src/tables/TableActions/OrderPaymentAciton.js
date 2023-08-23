import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UpdateOrderForm from "../../dashboard/DashboardComponents/UpdateOrderForm";

const OrderPaymentAciton = ({ row }) => {
  // Modal state
  const [open, setOpen] = useState(false);

  const paymentOption = ["authorized", "paid"];

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
            row?.original?.paymentStatus === "authorized"
              ? "warning"
              : row?.original?.paymentStatus === "paid"
              ? "success"
              : ""
          }
        >
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            size="small"
            onClick={() => setOpen(true)}
          >
            ● {row?.original?.paymentStatus}
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
          />
        </>
      </Modal>
    </>
  );
};

export default OrderPaymentAciton;
