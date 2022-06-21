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
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          alt="user image"
          src={row?.values.avatar}
          sx={{ width: 35, height: 35 }}
        />
        <span>{row?.values.name}</span>
      </Stack>
    ),
  },
  {
    Header: "Username",
    accessor: "username",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Avatar",
    accessor: "avatar",
  },

  {
    Header: "Admin",
    accessor: "isAdmin",
    Cell: ({ row }) => (
      <div style={{ paddingLeft: "10px" }}>
        {row?.values.isAdmin ? (
          <CheckCircleIcon color="success" />
        ) : (
          <HighlightOffIcon color="error" />
        )}
      </div>
    ),
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
    Cell: ({ row }) => <UserAction row={row} />,
  },
];
