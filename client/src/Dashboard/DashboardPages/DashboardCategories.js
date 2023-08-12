import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useMemo, useState } from "react";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import {
  categoryList,
  categoryListReset,
} from "../../App/actions/categoryActions";
import CustomAlert from "../../Components/CustomAlert";
import CustomTable from "../../ReactTable/CustomTable";
import { categoryColumn } from "../../ReactTable/TableColumns/CategoryColumn";
import AddCategoryForm from "../DashboardComponents/AddCategoryForm";
import CustomTableLoader from "../DashboardComponents/CustomTableLoader";
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

    return () => {
      dispatch(categoryListReset());
    };
  }, [dispatch, category?.success, updateCat?.success, deleteCate?.success]);

  // React table elements
  const data = useMemo(() => (categories?.length ? categories : []), [
    categories,
  ]);
  const columns = useMemo(() => (categories?.length ? categoryColumn : []), [
    categories,
  ]);

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
          {loading ? (
            <CustomTableLoader />
          ) : error ? (
            <CustomAlert severity="error" message={error} />
          ) : categories?.message ? (
            <CustomAlert severity="error" message="Something was wrong!" />
          ) : (
            <>
              <div className="dc__header">
                <h4 className="header__title">Category list</h4>

                <div className="btn small__btn btn__dark">
                  <Button type="button" onClick={() => setOpen(true)}>
                    <span className="btn__text">Add Category</span>
                    <AddIcon />
                  </Button>
                </div>
              </div>

              <div className="dc__categories">
                <CustomTable tableInstance={tableInstance} />
              </div>
            </>
          )}
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
