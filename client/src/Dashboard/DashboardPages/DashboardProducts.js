import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import AddProductForm from "../DashboardComponents/AddProductForm";
import DashboardLayout from "../DashboardLayout/DashboardLayout";

const DashboardProducts = () => {
  const [open, setOpen] = useState(false);

  const options = ["All", "two", "three"];
  return (
    <DashboardLayout title="Product Inventory">
      <section className="dp__section">
        <div className="dp__container">
          <div className="dp__header">
            <h4 className="header__title">Product list</h4>
            <div className="dp__categories">
              <h4 className="category__title">Categories</h4>
              <Dropdown
                options={options}
                onChange={this?._onSelect}
                value={options[0]}
                placeholder="Select an option"
              />
            </div>
          </div>
          <div className="dp__products"></div>
        </div>
        <div className="d__btn d__dark">
          <IconButton onClick={() => setOpen(true)}>
            <span className="btn__text">Add Product</span>
            <AddIcon />
          </IconButton>
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
