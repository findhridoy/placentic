import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Stack } from "@mui/material";
import React from "react";
import Moment from "react-moment";
import UserAction from "../TableActions/UserAction";

// User column
export const userColumn = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          alt="user image"
          src={row?.original?.avatar}
          sx={{ width: 35, height: 35 }}
        />
        <span>{row?.original?.name}</span>
      </Stack>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span>
        {row?.original?.phone ? `+88${row?.original?.phone}` : "Not set yet"}
      </span>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => (
      <span>
        {row?.original?.country ? row?.original?.country : "Not set yet"}
      </span>
    ),
  },
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
  },

  {
    accessorKey: "isAdmin",
    header: "Admin",
    cell: ({ row }) => (
      <div style={{ paddingLeft: "10px" }}>
        {row?.original?.isAdmin ? (
          <CheckCircleIcon color="success" />
        ) : (
          <HighlightOffIcon color="error" />
        )}
      </div>
    ),
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
    cell: ({ row }) => <UserAction row={row} />,
  },
];
