// import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Stack } from "@mui/material";
import React from "react";
import Moment from "react-moment";
import ProductAction from "../TableActions/ProductAction";

// Product column
export const productColumn = [
  {
    Header: "Title",
    accessor: "title",
    Cell: ({ row }) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          alt="product image"
          src={row?.values.image}
          sx={{ width: 35, height: 35 }}
        />
        <span>{row?.values.title}</span>
      </Stack>
    ),
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Reviews",
    accessor: "countReviews",
  },
  {
    Header: "Stock",
    accessor: "countInStock",
  },
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Image",
    accessor: "image",
  },
  {
    Header: "Description",
    accessor: "description",
  },

  {
    Header: "Date",
    accessor: "updatedAt",
    Cell: ({ row }) => (
      <Moment format="D MMM YYYY" withTitle>
        {row?.values.updatedAt}
      </Moment>
    ),
  },

  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => <ProductAction row={row} />,
  },
];
