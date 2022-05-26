import AddIcon from "@mui/icons-material/Add";
import { Button, Skeleton } from "@mui/material";
import Modal from "@mui/material/Modal";
import cogoToast from "cogo-toast";
import React, { useEffect, useMemo, useState } from "react";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import CustomTable from "../../ReactTable/CustomTable";
import { categoryColumn } from "../../ReactTable/TableColumns/CategoryColumn";
import {
  categoryList,
  categoryListReset,
} from "../../Redux/actions/categoryActions";
import AddCategoryForm from "../DashboardComponents/AddCategoryForm";
import DashboardLayout from "../DashboardLayout/DashboardLayout";

const DashboardCategories = () => {
  // Modal state
  const [open, setOpen] = useState(false);

  // Redux element
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.categoryList
  );
  const { category } = useSelector((state) => state.createCategory);
  const { category: updateCat } = useSelector((state) => state.updateCategory);
  const { category: deleteCate } = useSelector((state) => state.deleteCategory);

  useEffect(() => {
    dispatch(categoryList("categories"));
  }, [dispatch, category?.title, updateCat?.title, deleteCate?.success]);

  // navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(categoryListReset());
      navigate("/");
    }
    if (categories?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(categoryListReset());
      navigate("/");
    }
  }, [error, categories, dispatch, navigate]);

  // React table elements
  const data = useMemo(() => categories, [categories]);
  const columns = useMemo(() => categoryColumn, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { hiddenColumns: "image" },
    },
    useGlobalFilter,
    usePagination
  );

  const { state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  return (
    <DashboardLayout
      title="Categories"
      filter={globalFilter}
      setFilter={setGlobalFilter}
    >
      <section className="dc__section">
        <div className="dc__container">
          <div className="dc__header">
            {loading ? (
              <Skeleton width={100} animation="wave" height={35} />
            ) : (
              <h4 className="header__title">Category list</h4>
            )}

            {loading ? (
              <Skeleton variant="rectangular" width={130} height={35} />
            ) : (
              <div className="btn small__btn btn__dark">
                <Button type="button" onClick={() => setOpen(true)}>
                  <span className="btn__text">Add Category</span>
                  <AddIcon />
                </Button>
              </div>
            )}
          </div>
          <div className="dc__categories">
            <CustomTable tableInstance={tableInstance} loading={loading} />
          </div>
        </div>

        <div className="dc__modal">
          <Modal open={open} onClose={() => setOpen(false)}>
            <>
              <AddCategoryForm setOpen={setOpen} />
            </>
          </Modal>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardCategories;
