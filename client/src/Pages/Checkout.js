import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";

const Checkout = () => {
  return (
    <section className="checkout__section">
      <div className="container">
        <CustomBreadcrumbs title="Checkout" />
        <div className="checkout__container">
          <div className="chekout__content"></div>
          <div className="chekout__subtotal"></div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
