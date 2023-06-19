import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { IconButton } from "@mui/material";
import React from "react";

const CustomViewer = ({ viewer, setViewer }) => {
  // view changer
  const hangleViewerChange = (e) => {
    setViewer(e);
  };
  return (
    <div className="customViewer">
      <span className="customViewer__title">View</span>
      <div className="customViewer__icons">
        <div className={viewer === "grid" ? "active__viewer" : ""}>
          <IconButton size="small" onClick={() => hangleViewerChange("grid")}>
            <GridViewIcon fontSize="small" />
          </IconButton>
        </div>
        <div className={viewer === "list" ? "active__viewer" : ""}>
          <IconButton size="small" onClick={() => hangleViewerChange("list")}>
            <ViewListIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CustomViewer;
