import { Avatar, Stack } from "@mui/material";
import React from "react";
import Moment from "react-moment";
import TableActions from "../TableComponents/TableActions";

// Category column
const categoryColumns = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Image",
    accessor: "image",
    show: false,
  },
  {
    Header: "Title",
    accessor: "title",
    Cell: ({ row }) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          alt="category image"
          src={row?.values.image}
          sx={{ width: 35, height: 35 }}
        />
        <span>{row?.values.title}</span>
      </Stack>
    ),
  },
  {
    Header: "Slug",
    accessor: "slug",
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
    Cell: ({ row }) => <TableActions row={row} category={true} />,
  },
];

export { categoryColumns };
