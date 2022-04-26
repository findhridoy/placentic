import React from "react";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";
import Layout from "../Layouts/Layout";

const Orders = ({ profile }) => {
  return profile ? (
    <section className="orders__section">Orders not found.</section>
  ) : (
    <Layout>
      <CustomBreadcrumbs title="Orders" />
      <section className="orders__section section">Orders not found.</section>
    </Layout>
  );
};

export default Orders;
