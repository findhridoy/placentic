// import { Avatar, Stack } from "@mui/material";
import Moment from "react-moment";
import OrderAction from "../TableActions/OrderAction";
import OrderDeliveryAction from "../TableActions/OrderDeliveryAction";
import OrderPaymentAciton from "../TableActions/OrderPaymentAciton";

//Customer Order column
export const customerOrderColumn = [
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
    header: "Name",
    cell: ({ row }) => <span>{row?.original?.customer?.name}</span>,
  },
  //   {
  //     accessorKey: "shippingAddress",
  //     header: "Address",
  //     cell: ({ row }) => (
  //       <>
  //         <div>{row?.original?.shippingAddress?.city}</div>
  //         <div>{row?.original?.shippingAddress?.address?.slice(0, 16)}...</div>
  //       </>
  //     ),
  //   },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => <OrderDeliveryAction row={row} customer={true} />,
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
    accessorKey: "paymentResult",
    header: "Payment Status",
    cell: ({ row }) => <OrderPaymentAciton row={row} customer={true} />,
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
    cell: ({ row }) => <OrderAction row={row} customer={true} />,
  },
];
