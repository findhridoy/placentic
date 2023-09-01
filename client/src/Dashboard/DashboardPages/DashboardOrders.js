import FilterListIcon from "@mui/icons-material/FilterList";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import "react-dropdown/style.css";
import { useGetOrdersQuery } from "../../app/features/orders/orderApi";
import { orderColumn } from "../../tables/TableColumns/OrderColumn";
import CsvExport from "../../tables/TableComponents/ExportComponents/CsvExport";
import SortFilter from "../../tables/TableComponents/FilterComponents/SortFilter";
import MenuButtonLayout from "../../tables/TableLayout/MenuButtonLayout";
import TableLayout from "../../tables/TableLayout/TableLayout";
import DashboardLayout from "../DashboardLayout/DashboardLayout";

const DashboardOrders = () => {
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
    data: orderData,
  } = useGetOrdersQuery(
    `order?page=${pageIndex}&size=${pageSize}&sort=${sort}&keyword=${keyword}`
  );

  // filter reset handler
  // const resetHandler = () => {
  //   setRating(0);
  //   setCategories("");
  //   setPrice({
  //     gte: 0,
  //     lte: 100,
  //   });
  // };

  // sort reset handler
  const resetSortHandler = () => {
    setSort("");
  };

  // React table elements
  const data = useMemo(
    () => (orderData?.orders?.length ? orderData?.orders : []),
    [orderData?.orders]
  );
  const columns = useMemo(() => orderColumn, []);
  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  // table instance
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(orderData?.counts / pageSize) || 0,
    state: {
      // columnVisibility: { _id: false, image: false, description: false },
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  // export table data to csv file
  const csvData = [
    [
      "ORDER #",
      "CUSTOMER",
      "ADDRESS",
      "ITEMS",
      "TAX",
      "SHIPPING PRICE",
      "TOTAL PRICE",
      "DELIVERY STATUS",
      "DELIVERY DATE",
      "PAYMENT STATUS",
      "PAYMENT DATE",
      "PAYMENT METHOD",
      "CREATE DATE",
    ],
    ...data?.map((order) => [
      order?.orderID,
      order?.customer?.name,
      `${order?.shippingAddress?.address}, ${order?.shippingAddress?.city}`,
      order?.orderItems?.length,
      order?.taxPrice,
      order?.shippingPrice,
      order?.totalPrice,
      order?.deliveryStatus,
      moment(order?.deliveredAt).format("D-MM-YYYY"),
      order?.paymentStatus,
      moment(order?.paidAt).format("D-MM-YYYY"),
      order?.paymentMethod,
      moment(order?.createdAt).format("D-MM-YYYY"),
    ]),
  ];

  // csv file name
  const filename = `Orders - ${moment(new Date()).format("D-MM-YYYY")}`;

  return (
    <DashboardLayout title="Orders">
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
        data={orderData?.orders}
        errorTitle="Sorry! No order found :("
      />
    </DashboardLayout>
  );
};

export default DashboardOrders;
