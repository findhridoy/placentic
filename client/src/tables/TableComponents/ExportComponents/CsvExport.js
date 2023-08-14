import GetAppIcon from "@mui/icons-material/GetApp";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { CSVLink } from "react-csv";

const CsvExport = ({ csvData, filename }) => {
  return (
    <>
      <CSVLink
        data={csvData}
        filename={filename}
        className="tableLayout__button btn small__btn btn__white"
      >
        <Button type="button" variant="contained" startIcon={<GetAppIcon />}>
          Export
        </Button>
      </CSVLink>

      <CSVLink
        data={csvData}
        filename={filename}
        className="mobile__button btn__white"
      >
        <IconButton>
          <GetAppIcon fontSize="small" />
        </IconButton>
      </CSVLink>
    </>
  );
};

export default CsvExport;
