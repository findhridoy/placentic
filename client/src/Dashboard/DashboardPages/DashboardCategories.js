import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import cogoToast from "cogo-toast";
import React, { useEffect, useMemo, useState } from "react";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalFilter, useTable } from "react-table";
import CustomLoader from "../../Components/CustomLoader";
import { categoryColumns } from "../../Helpers/TableColumns/CategoryColumns";
import {
  categoryList,
  categoryListReset,
} from "../../Redux/actions/categoryActions";
import AddCategoryForm from "../DashboardComponents/AddCategoryForm";
import CustomTable from "../DashboardComponents/CustomTable";
import DashboardLayout from "../DashboardLayout/DashboardLayout";

const DashboardCategories = () => {
  const [open, setOpen] = useState(false);

  // Redux element
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.categoryList
  );

  useEffect(() => {
    dispatch(categoryList("categories"));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(categoryListReset());
    }
    if (categories?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(categoryListReset());
    }
  }, [error, categories, dispatch]);

  // React table elements
  const data = useMemo(() => categories, [categories]);
  const columns = useMemo(() => categoryColumns, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { hiddenColumns: "image" },
    },
    useGlobalFilter
  );

  const { state, setGlobalFilter } = tableInstance;

  const { globalFilter } = state;

  return loading ? (
    <CustomLoader size={40} />
  ) : (
    <DashboardLayout
      title="Categories"
      filter={globalFilter}
      setFilter={setGlobalFilter}
    >
      <section className="dc__section">
        <div className="dc__container">
          <div className="dc__header">
            <h4 className="header__title">Category list</h4>
          </div>
          <div className="dp__categories">
            <CustomTable tableInstance={tableInstance} />
          </div>
        </div>
        <div className="d__btn d__dark">
          <IconButton onClick={() => setOpen(true)}>
            <span className="btn__text">Add Category</span>
            <AddIcon />
          </IconButton>
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
