import { Avatar, Stack } from "@mui/material";
import React from "react";
import Moment from "react-moment";
import CategoryAction from "../TableActions/CategoryAction";

// Category column
export const categoryColumn = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          alt="category image"
          src={row?.original?.image}
          sx={{ width: 35, height: 35 }}
        />
        <span>{row?.original?.title}</span>
      </Stack>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
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
    cell: ({ row }) => <CategoryAction row={row} />,
  },
];
