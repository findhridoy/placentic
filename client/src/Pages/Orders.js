import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useGetOrderQuery } from "../app/features/orders/orderApi";
import orderImage from "../assets/banners/order2.jpg";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";
import Layout from "../layouts/Layout";
import { customerOrderColumn } from "../tables/TableColumns/CustomerOrderColumn";
import TableLayout from "../tables/TableLayout/TableLayout";

const Orders = ({ profile }) => {
  // States
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
  } = useGetOrderQuery(
    `order/user?page=${pageIndex}&size=${pageSize}&keyword=${keyword}`
  );

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

  return profile ? (
    <section className="orders__section">
      <div className="orders__tables">
        <TableLayout
          table={table}
          // isSearchField={true}
          setKeyword={setKeyword}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
          data={orderData?.orders}
          errorTitle="Sorry! No order found :("
        />
      </div>
    </section>
  ) : (
    <Layout>
      <CustomBreadcrumbs title="Orders" image={orderImage} />
      <section className="orders__section">
        <div className="container">
          <div className="orders__tables">
            <TableLayout
              table={table}
              isSearchField={true}
              setKeyword={setKeyword}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              error={error}
              data={orderData?.orders}
              errorTitle="Sorry! No order found :("
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Orders;
