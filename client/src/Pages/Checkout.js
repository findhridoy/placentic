import checkoutImage from "../assets/banners/checkout4.jpg";
import CheckoutSubtotal from "../components/CheckoutSubtotal";
import CustomizeAccordion from "../components/CustomizeAccordion";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";

const Checkout = () => {
  return (
    <section className="checkout__section">
      <CustomBreadcrumbs title="Checkout" image={checkoutImage} />
      <div className="container">
        <div className="checkout__container">
          <div className="chekout__content">
            <CustomizeAccordion />
          </div>

          <div className="chekout__subtotal">
            <CheckoutSubtotal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
