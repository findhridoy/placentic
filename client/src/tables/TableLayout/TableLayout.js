import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  CircularProgress,
  IconButton,
  Pagination,
} from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import CustomAlert from "../../components/controls/CustomAlert";
import CustomButton from "../../components/controls/CustomButton";

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
  isError,
  error,
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
        {isLoading ? (
          <div className="tableLayout__loader">
            <CircularProgress color="inherit" size={28} thickness={3} />
          </div>
        ) : isError ? (
          <CustomAlert severity="info" message={error?.message} />
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
          </table>
        )}
      </div>

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
    </div>
  );
};

export default TableLayout;
