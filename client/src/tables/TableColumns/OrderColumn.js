import { Avatar, Stack } from "@mui/material";
import Moment from "react-moment";
import OrderAction from "../TableActions/OrderAction";
import OrderDeliveryAction from "../TableActions/OrderDeliveryAction";
import OrderPaymentAciton from "../TableActions/OrderPaymentAciton";

// Order column
export const orderColumn = [
  {
    accessorKey: "orderID",
    header: "Order #",
    cell: ({ row }) => (
      <span style={{ textTransform: "uppercase" }}>
        #{row?.original?.orderID}
      </span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          alt="user image"
          src={row?.original?.customer?.image}
          sx={{ width: 28, height: 28 }}
        />
        <span>{row?.original?.customer?.name}</span>
      </Stack>
    ),
  },
  {
    accessorKey: "shippingAddress",
    header: "Address",
    cell: ({ row }) => (
      <>
        <div>{row?.original?.shippingAddress?.city}</div>
        <div>{row?.original?.shippingAddress?.address?.slice(0, 16)}...</div>
      </>
    ),
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => <OrderDeliveryAction row={row} />,
  },
  {
    accessorKey: "orderItems",
    header: "Items",
    cell: ({ row }) => row?.original?.orderItems?.length,
  },
  // {
  //   accessorKey: "shippingPrice",
  //   header: "Shipping",
  // },
  // {
  //   accessorKey: "texPrice",
  //   header: "Tax",
  // },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => <>${row?.original?.totalPrice}</>,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => <OrderPaymentAciton row={row} />,
  },
  // {
  //   accessorKey: "paidAt",
  //   header: "Payment Date",
  //   cell: ({ row }) => (
  //     <Moment format="D MMM YYYY" withTitle>
  //       {row?.original?.paidAt}
  //     </Moment>
  //   ),
  // },

  // {
  //   accessorKey: "deliveryAt",
  //   header: "Delivery Date",
  //   cell: ({ row }) => (
  //     <Moment format="D MMM YYYY" withTitle>
  //       {row?.original?.deliveryAt}
  //     </Moment>
  //   ),
  // },

  {
    accessorKey: "createdAt",
    header: "Create Date",
    cell: ({ row }) => (
      <Moment format="MMM D, YYYY" withTitle>
        {row?.original?.createdAt}
      </Moment>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <OrderAction row={row} />,
  },
];
