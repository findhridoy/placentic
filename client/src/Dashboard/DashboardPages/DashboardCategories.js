import FilterListIcon from "@mui/icons-material/FilterList";
import Modal from "@mui/material/Modal";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import "react-dropdown/style.css";
import { useGetCategoriesQuery } from "../../app/features/categories/categoryApi";
import CsvExport from "../../tables/TableComponents/ExportComponents/CsvExport";
import SortFilter from "../../tables/TableComponents/FilterComponents/SortFilter";
import MenuButtonLayout from "../../tables/TableLayout/MenuButtonLayout";
import TableLayout from "../../tables/TableLayout/TableLayout";
import AddCategoryForm from "../DashboardComponents/AddCategoryForm";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { categoryColumn } from "./../../tables/TableColumns/CategoryColumn";

const DashboardCategories = () => {
  // States
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [keyword, setKeyword] = useState("");
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  // Redux element
  const {
    isLoading,
    isError,
    error,
    isFetching,
    data: categoryData,
  } = useGetCategoriesQuery(
    `category?page=${pageIndex}&size=${pageSize}&sort=${sort}&keyword=${keyword}`
  );

  // sort reset handler
  const resetSortHandler = () => {
    setSort("");
  };

  // React table elements
  const data = useMemo(
    () => (categoryData?.categories?.length ? categoryData?.categories : []),
    [categoryData?.categories]
  );
  const columns = useMemo(() => categoryColumn, []);
  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  // table instance
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(categoryData?.counts / pageSize) || 0,
    state: {
      columnVisibility: { _id: false, image: false },
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  // export table data to csv file
  const csvData = [
    ["TITLE", "MESSAGE", "DATE", "IMAGE"],
    ...data?.map((category) => [
      category?.title,
      category?.message,
      moment(category?.createdAt).format("D-MM-YYYY"),
      category?.image ? "Yes" : "No",
    ]),
  ];

  // csv file name
  const filename = `Categories - ${moment(new Date()).format("D-MM-YYYY")}`;

  return (
    <DashboardLayout title="Categories">
      <TableLayout
        table={table}
        isSearchField={true}
        setKeyword={setKeyword}
        isSortButton={true}
        SortButtonComponent={
          <MenuButtonLayout
            buttonText="Sort By"
            buttonIconComponent={<FilterListIcon fontSize="small" />}
            resetText="Reset"
            resetHandler={resetSortHandler}
          >
            <SortFilter sort={sort} setSort={setSort} />
          </MenuButtonLayout>
        }
        isExportButton={true}
        ExportButtonComponent={
          <CsvExport csvData={csvData} filename={filename} />
        }
        isAddButton={true}
        addButtonHandler={() => setOpen(true)}
        addButtonText="Add New"
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        data={categoryData?.categories}
        errorTitle="Sorry! No category found :("
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <AddCategoryForm setOpen={setOpen} />
        </>
      </Modal>
    </DashboardLayout>
  );
};

export default DashboardCategories;
