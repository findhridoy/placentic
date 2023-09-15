import { Skeleton } from "@mui/material";
import React from "react";

const TableLoader = ({ table }) => {
  return (
    <tbody>
      {table.getHeaderGroups()?.map((headerGroup) =>
        [...Array(10).keys()].map((index) => (
          <tr className="loader__tr" key={index}>
            {headerGroup.headers?.map((header) => (
              <td colSpan={header.colSpan} key={header.id}>
                <Skeleton
                  width={`${Math.floor(Math.random() * 50) + 51}%`}
                  animation="wave"
                  height={25}
                />
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TableLoader;
