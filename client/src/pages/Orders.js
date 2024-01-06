import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Divider } from "@mui/material";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useGetCategoriesQuery } from "../app/features/categories/categoryApi";
import { useGetOrderQuery } from "../app/features/orders/orderApi";
import ProfileLayout from "../layouts/ProfileLayout";
import { customerOrderColumn } from "../tables/TableColumns/CustomerOrderColumn";
import CsvExport from "../tables/TableComponents/ExportComponents/CsvExport";
import CategoryFilter from "../tables/TableComponents/FilterComponents/CategoryFilter";
import PriceFilter from "../tables/TableComponents/FilterComponents/PriceFilter";
import RatingFilter from "../tables/TableComponents/FilterComponents/RatingFilter";
import SortFilter from "../tables/TableComponents/FilterComponents/SortFilter";
import MenuButtonLayout from "../tables/TableLayout/MenuButtonLayout";
import TableLayout from "../tables/TableLayout/TableLayout";

const Orders = () => {
  // States
  const [sort, setSort] = useState("");
  const [keyword, setKeyword] = useState("");
  const [rating, setRating] = useState(0);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState({
    gte: 0,
    lte: 100,
  });
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  // Redux toolkit element
  const {
    isError: categoryIsError,
    error: categoryError,
    data: categoryData,
  } = useGetCategoriesQuery("category");

  const {
    isLoading,
    isError,
    error,
    isFetching,
    data: orderData,
  } = useGetOrderQuery(
    `order/user?page=${pageIndex}&size=${pageSize}&keyword=${keyword}`
  );

  // filter reset handler
  const resetHandler = () => {
    setRating(0);
    setCategories("");
    setPrice({
      gte: 0,
      lte: 100,
    });
  };

  // sort reset handler
  const resetSortHandler = () => {
    setSort("");
  };
  // console.log(orderData);

  // React table elements
  const data = useMemo(
    () => (orderData?.orders?.length ? orderData?.orders : []),
    [orderData?.orders]
  );
  const columns = useMemo(() => customerOrderColumn, []);
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
      order?.paymentResult?.status,
      moment(order?.paymentResult?.paid_at).format("D-MM-YYYY"),
      order?.paymentResult?.payment_method,
      moment(order?.createdAt).format("D-MM-YYYY"),
    ]),
  ];

  // csv file name
  const filename = `Orders - ${moment(new Date()).format("D-MM-YYYY")}`;

  return (
    <ProfileLayout title="Your orders">
      {/* <section className="orders__section">
        <div className="container">
          <div className="orders__tables"> */}
      <TableLayout
        table={table}
        isSearchField={true}
        setKeyword={setKeyword}
        isFilterButton={true}
        FilterButtonComponent={
          <MenuButtonLayout
            buttonText="Filter By"
            buttonIconComponent={<FilterAltIcon fontSize="small" />}
            resetText="Reset Filters"
            resetHandler={resetHandler}
          >
            <CategoryFilter
              categories={categories}
              setCategories={setCategories}
              categoryData={categoryData}
            />
            <Divider sx={{ my: 0.5 }} />
            <PriceFilter price={price} setPrice={setPrice} />
            <Divider sx={{ my: 0.5 }} />
            <RatingFilter rating={rating} setRating={setRating} />
          </MenuButtonLayout>
        }
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
      {/* </div>
        </div>
      </section> */}
    </ProfileLayout>
  );
};

export default Orders;
