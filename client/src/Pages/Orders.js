import React from "react";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";
import Layout from "../layouts/Layout";

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
