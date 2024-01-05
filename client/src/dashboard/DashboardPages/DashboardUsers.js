import FilterListIcon from "@mui/icons-material/FilterList";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import { useGetUsersQuery } from "../../app/features/users/userApi";
import { userColumn } from "../../tables/TableColumns/UserColumn";
import CsvExport from "../../tables/TableComponents/ExportComponents/CsvExport";
import SortFilter from "../../tables/TableComponents/FilterComponents/SortFilter";
import MenuButtonLayout from "../../tables/TableLayout/MenuButtonLayout";
import TableLayout from "../../tables/TableLayout/TableLayout";
import DashboardLayout from "../DashboardLayout/DashboardLayout";

const DashboardUsers = () => {
  // States
  const [sort, setSort] = useState("");
  const [keyword, setKeyword] = useState("");
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  // Redux toolkit element
  const {
    isLoading,
    isError,
    error,
    isFetching,
    data: userData,
  } = useGetUsersQuery(
    `user?page=${pageIndex}&size=${pageSize}&sort=${sort}&keyword=${keyword}`
  );

  // sort reset handler
  const resetSortHandler = () => {
    setSort("");
  };

  // React table elements
  const data = useMemo(
    () => (userData?.users?.length ? userData?.users : []),
    [userData?.users]
  );
  const columns = useMemo(() => userColumn, []);
  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  // table instance
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(userData?.counts / pageSize) || 0,
    state: {
      columnVisibility: { _id: false, avatar: false },
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  // export table data to csv file
  const csvData = [
    ["NAME", "USERNAME", "EMAIL", "PHONE", "COUNTRY", "ADMIN", "DATE", "IMAGE"],
    ...data?.map((user) => [
      user?.name,
      user?.username,
      user?.email,
      user?.phone ? `+88${user?.phone}` : "Not set yet",
      user?.country ? user?.country : "Not set yet",
      user?.isAdmin ? "Yes" : "No",
      moment(user?.createdAt).format("D-MM-YYYY"),
      user?.avatar ? "Yes" : "No",
    ]),
  ];

  // csv file name
  const filename = `Users - ${moment(new Date()).format("D-MM-YYYY")}`;
  return (
    <DashboardLayout title="Users">
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
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        data={userData?.users}
        errorTitle="Sorry! No user found :("
      />
    </DashboardLayout>
  );
};

export default DashboardUsers;
