import { Skeleton, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React from "react";

const CustomTable = ({ tableInstance, loading }) => {
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
        {loading ? (
          <>
            <Skeleton width="100%" animation="wave">
              <Typography variant="h3">.</Typography>
            </Skeleton>
          </>
        ) : (
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}

        {loading ? (
          [1, 2, 3, 4, 5].map((index) => (
            <Skeleton width="100%" animation="wave" key={index}>
              <Typography variant="h2">.</Typography>
            </Skeleton>
          ))
        ) : (
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
        )}
      </table>
      <div className="customTable__pagination">
        {loading ? (
          <Skeleton width={90} animation="wave" height={30} />
        ) : (
          <span className="pagination__text">
            Showing{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
        )}
        {loading ? (
          <Skeleton width={110} animation="wave" height={40} />
        ) : (
          <Pagination
            count={pageOptions.length}
            color="primary"
            onChange={(event, value) => gotoPage(value - 1)}
          />
        )}
      </div>
    </div>
  );
};

export default CustomTable;
