// import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Stack } from "@mui/material";
// import React from "react";
import Moment from "react-moment";
import ProductAction from "../TableActions/ProductAction";

// Product column
export const productColumn = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          alt="product image"
          src={row?.original?.image}
          sx={{ width: 35, height: 35 }}
        />
        <span>{row?.original?.title}</span>
      </Stack>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "countReviews",
    header: "Reviews",
  },
  {
    accessorKey: "countInStock",
    header: "Stock",
  },
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "updatedAt",
    header: "Date",
    cell: ({ row }) => (
      <Moment format="D MMM YYYY" withTitle>
        {row?.original?.updatedAt}
      </Moment>
    ),
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <ProductAction row={row} />,
  },
];
