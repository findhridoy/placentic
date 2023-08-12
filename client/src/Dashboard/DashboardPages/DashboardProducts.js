import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Divider } from "@mui/material";
import Modal from "@mui/material/Modal";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import "react-dropdown/style.css";
import {
  useGetCategoriesByProductQuery,
  useGetProductsQuery,
} from "../../app/features/products/productApi";
import { productColumn } from "../../tables/TableColumns/ProductColumn";
import Tables from "../../tables/Tables";
import CategoryFilter from "../DashboardComponents/FiltersComponents/CategoryFilter";
import PriceFilter from "../DashboardComponents/FiltersComponents/PriceFilter";
import RatingFilter from "../DashboardComponents/FiltersComponents/RatingFilter";
import SortFilter from "../DashboardComponents/FiltersComponents/SortFilter";
import MenuButton from "../DashboardComponents/MenuButton";
import DashboardLayout from "../DashboardLayout/DashboardLayout";

const DashboardProducts = () => {
  // States
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
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

  // Redux element
  const { data: categoryData } =
    useGetCategoriesByProductQuery(`product/categories`);

  const {
    isLoading,
    isError,
    error,
    isFetching,
    data: productData,
  } = useGetProductsQuery(
    `product?page=${pageIndex}&size=${pageSize}&category=${categories}&price[gte]=${price?.gte}&price[lte]=${price?.lte}&ratings[gte]=${rating}&sort=${sort}`
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

  return (
    <DashboardLayout title="Product Inventory">
      <Tables
        table={table}
        isSearchField={true}
        isFilterButton={true}
        FilterButtonComponent={
          <MenuButton
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
          </MenuButton>
        }
        isSortButton={true}
        SortButtonComponent={
          <MenuButton
            buttonText="Sort By"
            buttonIconComponent={<FilterListIcon fontSize="small" />}
            resetText="Reset"
            resetHandler={resetSortHandler}
          >
            <SortFilter sort={sort} setSort={setSort} />
          </MenuButton>
        }
        isExportButton={true}
        isAddButton={true}
        addButtonText="Add New"
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <>{/* <AddProductForm setOpen={setOpen} /> */}</>
      </Modal>
    </DashboardLayout>
  );
};

export default DashboardProducts;
