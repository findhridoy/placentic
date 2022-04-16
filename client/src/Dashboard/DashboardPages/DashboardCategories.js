import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import "react-dropdown/style.css";
import AddCategoryForm from "../DashboardComponents/AddCategoryForm";
import DashboardLayout from "../DashboardLayout/DashboardLayout";

const DashboardCategories = () => {
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout title="Categories">
      <section className="dc__section">
        <div className="dc__container">
          <div className="dc__header">
            <h4 className="header__title">Category list</h4>
          </div>
          <div className="dp__categories"></div>
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
