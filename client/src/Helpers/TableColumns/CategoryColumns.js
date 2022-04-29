import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Avatar, IconButton } from "@mui/material";

// Category column
export const categoryColumns = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Category Image",
    accessor: "image",
    Cell: ({ row }) => (
      <Avatar
        alt="category image"
        src={row.values.image}
        sx={{ width: 35, height: 35 }}
      />
    ),
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Slug",
    accessor: "slug",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => (
      <div className="btn__group">
        <IconButton size="small">
          <ModeEditIcon />
        </IconButton>
        <IconButton size="small">
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];
