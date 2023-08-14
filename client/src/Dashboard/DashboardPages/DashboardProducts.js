import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Divider } from "@mui/material";
import Modal from "@mui/material/Modal";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import "react-dropdown/style.css";
import {
  useGetCategoriesByProductQuery,
  useGetProductsQuery,
} from "../../app/features/products/productApi";
import { productColumn } from "../../tables/TableColumns/ProductColumn";
import CsvExport from "../../tables/TableComponents/ExportComponents/CsvExport";
import CategoryFilter from "../../tables/TableComponents/FilterComponents/CategoryFilter";
import PriceFilter from "../../tables/TableComponents/FilterComponents/PriceFilter";
import RatingFilter from "../../tables/TableComponents/FilterComponents/RatingFilter";
import SortFilter from "../../tables/TableComponents/FilterComponents/SortFilter";
import MenuButtonLayout from "../../tables/TableLayout/MenuButtonLayout";
import TableLayout from "../../tables/TableLayout/TableLayout";
import AddProductForm from "../DashboardComponents/AddProductForm";
import DashboardLayout from "../DashboardLayout/DashboardLayout";

const DashboardProducts = () => {
  // States
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [rating, setRating] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState({
    gte: 0,
    lte: 100,
  });
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  // Redux element
  const {
    categoryIsError,
    categoryError,
    data: categoryData,
  } = useGetCategoriesByProductQuery(`product/categories`);

  const {
    isLoading,
    isError,
    error,
    isFetching,
    data: productData,
  } = useGetProductsQuery(
    `product?page=${pageIndex}&size=${pageSize}&category=${categories}&price[gte]=${price?.gte}&price[lte]=${price?.lte}&ratings[gte]=${rating}&sort=${sort}&keyword=${keyword}`
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

  // React table elements
  const data = useMemo(
    () => (productData?.products?.length ? productData?.products : []),
    [productData?.products]
  );
  const columns = useMemo(() => productColumn, []);
  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  // table instance
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(productData?.counts / pageSize) || 0,
    state: {
      columnVisibility: { _id: false, image: false, description: false },
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  // export table data to csv file
  const csvData = [
    ["TITLE", "CATEGORY", "PRICE", "REVIEWS", "STOCK", "DATE", "IMAGE"],
    ...data?.map((product) => [
      product?.title,
      product?.category,
      product?.price,
      product?.countReviews,
      product?.countInStock,
      moment(product?.createdAt).format("D-MM-YYYY"),
      product?.image ? "Yes" : "No",
    ]),
  ];

  // csv file name
  const filename = `Products - ${moment(new Date()).format("D-MM-YYYY")}`;

  return (
    <DashboardLayout title="Product Inventory">
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
        isAddButton={true}
        addButtonHandler={() => setOpen(true)}
        addButtonText="Add New"
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <AddProductForm
            setOpen={setOpen}
            categoryData={categoryData}
            categoryIsError={categoryIsError}
            categoryError={categoryError}
          />
        </>
      </Modal>
    </DashboardLayout>
  );
};

export default DashboardProducts;
