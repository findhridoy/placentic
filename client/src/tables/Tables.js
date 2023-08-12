import AddIcon from "@mui/icons-material/Add";
import IosShareIcon from "@mui/icons-material/IosShare";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, IconButton, Pagination } from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import React from "react";
import CustomAlert from "../components/controls/CustomAlert";
import CustomButton from "../components/controls/CustomButton";

const Tables = ({
  table,
  isSearchField,
  isFilterButton,
  FilterButtonComponent,
  isSortButton,
  SortButtonComponent,
  isExportButton,
  isAddButton,
  addButtonText,
  isLoading,
  isError,
  error,
}) => {
  return (
    <div className="table__section">
      <div className="table__section-header">
        {isSearchField && (
          <div className="table__search">
            <SearchIcon />
            <input
              className="search__control"
              type="text"
              placeholder="Search..."
            />
          </div>
        )}

        <div className="table__button-group">
          {/* Filter component include filter button */}
          {isFilterButton && <>{FilterButtonComponent}</>}

          {/*  Sort component include sort button */}
          {isSortButton && <>{SortButtonComponent}</>}

          {isExportButton && (
            <>
              <CustomButton
                className="table__button btn small__btn btn__white"
                text="Export"
                startIcon={<IosShareIcon />}
                onClick={() => {}}
              />

              <div className="mobile__button btn__white">
                <IconButton>
                  <IosShareIcon fontSize="small" />
                </IconButton>
              </div>
            </>
          )}

          {isAddButton && (
            <>
              <CustomButton
                className="table__button btn small__btn btn__dark"
                text={addButtonText}
                startIcon={<AddIcon />}
                onClick={() => {}}
              />

              <div className="mobile__button btn__dark">
                <IconButton>
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="table__container">
        {isLoading ? (
          <div className="table__loader">
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

      <div className="table__section-footer">
        <div className="table__pagination">
          <Pagination
            count={table.getPageCount()}
            shape="rounded"
            size="small"
            onChange={(event, value) => {
              table.setPageIndex(value - 1);
            }}
          />
        </div>

        <div className="table__footer-right">
          <div className="table__listing">
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

          <span className="table__showing">
            Showing{" "}
            <strong>{table.getState().pagination.pageIndex + 1} </strong>
            of <strong>{table.getPageCount()}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tables;
