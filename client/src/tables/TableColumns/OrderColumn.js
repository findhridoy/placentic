// import CloseIcon from "@mui/icons-material/Close";
// import React from "react";
import Moment from "react-moment";
import ProductAction from "../TableActions/ProductAction";

// Order column
export const orderColumn = [
  {
    accessorKey: "_id",
    header: "Order Id",
  },
  //   {
  //     accessorKey: "title",
  //     header: "Title",
  //     cell: ({ row }) => (
  //       <Stack direction="row" spacing={1} alignItems="center">
  //         <Avatar
  //           alt="product image"
  //           src={row?.original?.image}
  //           sx={{ width: 35, height: 35 }}
  //         />
  //         <span>{row?.original?.title}</span>
  //       </Stack>
  //     ),
  //   },
  {
    accessorKey: "orderItems",
    header: "Items",
    cell: ({ row }) => row?.original?.orderItems?.length,
  },
  {
    accessorKey: "shippingPrice",
    header: "Shipping",
  },
  {
    accessorKey: "texPrice",
    header: "Tax",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "isPaid",
    header: "Payment Status",
  },
  {
    accessorKey: "paidAt",
    header: "Payment Date",
    cell: ({ row }) => (
      <Moment format="D MMM YYYY" withTitle>
        {row?.original?.paidAt}
      </Moment>
    ),
  },
  {
    accessorKey: "isDelivery",
    header: "Delivery Status",
  },
  {
    accessorKey: "deliveryAt",
    header: "Delivery Date",
    cell: ({ row }) => (
      <Moment format="D MMM YYYY" withTitle>
        {row?.original?.deliveryAt}
      </Moment>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Issue Date",
    cell: ({ row }) => (
      <Moment format="D MMM YYYY" withTitle>
        {row?.original?.createdAt}
      </Moment>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <ProductAction row={row} />,
  },
];
