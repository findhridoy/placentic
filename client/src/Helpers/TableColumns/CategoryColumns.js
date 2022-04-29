import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Avatar, IconButton, Stack } from "@mui/material";
import Moment from "react-moment";

// Category column
export const categoryColumns = [
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
          src={row.values.image}
          sx={{ width: 35, height: 35 }}
        />
        <span>{row.values.title}</span>
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
        {row.values.updatedAt}
      </Moment>
    ),
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => (
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton size="small" color="info">
          <ModeEditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    ),
  },
];
