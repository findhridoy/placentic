import AddIcon from "@mui/icons-material/Add";
import { Button, Skeleton } from "@mui/material";
import Modal from "@mui/material/Modal";
import cogoToast from "cogo-toast";
import { useEffect, useMemo, useState } from "react";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import {
  productList,
  productListReset,
} from "../../App/actions/productActions";
import CustomAlert from "../../Components/CustomAlert";
import CustomTable from "../../ReactTable/CustomTable";
import { productColumn } from "../../ReactTable/TableColumns/ProductColumn";
import AddProductForm from "../DashboardComponents/AddProductForm";
import DashboardLayout from "../DashboardLayout/DashboardLayout";

const DashboardProducts = () => {
  // States
  const [open, setOpen] = useState(false);

  // Redux element
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  const { product } = useSelector((state) => state.createProduct);
  const { product: deletedProduct } = useSelector(
    (state) => state.deleteProduct
  );
  const { product: updatedProduct } = useSelector(
    (state) => state.updateProduct
  );

  useEffect(() => {
    dispatch(productList("products"));

    return () => {
      dispatch(productListReset());
    };
  }, [dispatch, product?.success, updatedProduct?.success, deletedProduct]);

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(productListReset());
      // navigate("/");
    }
    if (products?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(productListReset());
      // navigate("/");
    }
  }, [error, products, dispatch]);

  // React table elements
  const data = useMemo(() => (products?.length ? products : []), [products]);
  const columns = useMemo(() => productColumn, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { hiddenColumns: ["image", "_id", "description"] },
    },
    useGlobalFilter,
    usePagination
  );

  const { state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  return (
    <DashboardLayout
      title="Product Inventory"
      filter={globalFilter}
      setFilter={setGlobalFilter}
    >
      <section className="dp__section">
        <div className="dp__container">
          <div className="dp__header">
            {loading ? (
              <Skeleton width={140} animation="wave" height={35} />
            ) : (
              <h4 className="header__title">Product list</h4>
            )}
            <div className="dp__categories">
              {loading ? (
                <Skeleton
                  width={130}
                  variant="rectangular"
                  animation="wave"
                  height={35}
                />
              ) : (
                <div className="btn small__btn btn__dark">
                  <Button type="button" onClick={() => setOpen(true)}>
                    <span className="btn__text">Add Product</span>
                    <AddIcon />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {!loading && products?.length === 0 ? (
            <CustomAlert severity="info" message="No products found!" />
          ) : (
            <div className="dp__products">
              <CustomTable tableInstance={tableInstance} loading={loading} />
            </div>
          )}
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <>
            <AddProductForm setOpen={setOpen} />
          </>
        </Modal>
      </section>
    </DashboardLayout>
  );
};

export default DashboardProducts;
