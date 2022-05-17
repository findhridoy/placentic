import Pagination from "@mui/material/Pagination";
import React from "react";

const CustomTable = ({ tableInstance }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    pageOptions,
    state: { pageIndex },
  } = tableInstance;

  return (
    <div className="customTable">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="customTable__pagination">
        <span className="pagination__text">
          Showing{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <Pagination
          count={pageOptions.length}
          color="primary"
          onChange={(event, value) => gotoPage(value - 1)}
        />
      </div>
    </div>
  );
};

export default CustomTable;
