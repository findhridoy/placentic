import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    border: "none",
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      fontFamily: "'Poppins', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      color: "rgba(0, 0, 0, 0.6)",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: "rgba(0, 0, 0, 0.6)",
        marginRight: theme.spacing(1),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const CommentHandler = ({
  anchorEl,
  setAnchorEl,
  handleMenuClick,
  userInfo,
  deleteLoader,
  permissionLoader,
}) => {
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // const handleMenuClick = () => {
  //   setAnchorEl(null);
  // };

  return (
    <div>
      <IconButton
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClick}
        size="small"
        disabled={!userInfo?.isAdmin}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClick}
      >
        <MenuItem
          onClick={() => handleMenuClick("approve")}
          disabled={permissionLoader}
        >
          <DoneIcon />
          Approve
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuClick("decline")}
          disabled={permissionLoader}
        >
          <RemoveCircleOutlineIcon />
          Decline
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuClick("remove")}
          disabled={deleteLoader}
        >
          <DeleteIcon />
          Remove
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default CommentHandler;
