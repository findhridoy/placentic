import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton, Pagination } from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/controls/CustomButton";
import TableError from "../TableComponents/CustomComponenets/TableError";
import TableLoader from "../TableComponents/CustomComponenets/TableLoader";

const TableLayout = ({
  table,
  isSearchField,
  setKeyword,
  isFilterButton,
  FilterButtonComponent,
  isSortButton,
  SortButtonComponent,
  isExportButton,
  ExportButtonComponent,
  isAddButton,
  addButtonText,
  addButtonHandler,
  isLoading,
  isFetching,
  isError,
  error,
  data,
  errorTitle,
}) => {
  // States
  const [inputValue, setInputValue] = useState("");

  // search functionality
  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(inputValue);
  };

  useEffect(() => {
    if (!inputValue) {
      setKeyword("");
    }
  }, [inputValue, setKeyword]);
  return (
    <div className="tableLayout__section">
      <div className="tableLayout__section-header">
        {isSearchField && (
          <form className="tableLayout__search" onSubmit={handleSubmit}>
            <span className="search__icon">
              <SearchIcon fontSize="small" />
            </span>
            <input
              className="search__control"
              type="search"
              placeholder="Search..."
              autoComplete="false"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <div className="search__button">
              <Button type="submit" size="small">
                Search
              </Button>

              <IconButton type="submit" size="small">
                <SearchIcon fontSize="small" />
              </IconButton>
            </div>
          </form>
        )}

        <div className="tableLayout__button-group">
          {/* Filter component include filter button */}
          {isFilterButton && <>{FilterButtonComponent}</>}

          {/*  Sort component include sort button */}
          {isSortButton && <>{SortButtonComponent}</>}

          {/*  Export component include export button */}
          {isExportButton && <>{ExportButtonComponent}</>}

          {isAddButton && (
            <>
              <CustomButton
                className="tableLayout__button btn small__btn btn__dark"
                text={addButtonText}
                startIcon={<AddIcon />}
                onClick={addButtonHandler}
              />

              <div className="mobile__button btn__dark">
                <IconButton onClick={addButtonHandler}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="tableLayout__container">
        {isError ? (
          <TableError errorTitle={errorTitle} subtitle={error?.message} />
        ) : data?.length === 0 ? (
          <TableError
            errorTitle={errorTitle}
            subtitle="We're sorry what you were looking for."
          />
        ) : (
          <table>
            <thead>
              {table.getHeaderGroups()?.map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers?.map((header) => (
                    <th colSpan={header.colSpan} key={header.id}>
                      {header.isPlaceHolder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {isLoading || isFetching ? (
              <TableLoader table={table} />
            ) : (
              <tbody>
                {table.getRowModel()?.rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells()?.map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>

      {!isLoading && !isError && data?.length !== 0 && (
        <div className="tableLayout__section-footer">
          <div className="tableLayout__pagination">
            <Pagination
              count={table.getPageCount()}
              shape="rounded"
              size="small"
              onChange={(event, value) => {
                table.setPageIndex(value - 1);
              }}
            />
          </div>

          {/* {console.log(table.getPageCount())} */}

          <div className="tableLayout__footer-right">
            <div className="tableLayout__listing">
              <span className="listing__title">Listing per page</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>

            <span className="tableLayout__showing">
              Showing{" "}
              <strong>{table.getState().pagination.pageIndex + 1} </strong>
              of <strong>{table.getPageCount()}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableLayout;
