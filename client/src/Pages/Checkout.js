import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import checkoutImage from "../assets/banners/checkout4.jpg";
import CheckoutSubtotal from "../components/CheckoutSubtotal";
import CustomizeAccordion from "../components/CustomizeAccordion";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";

const Checkout = () => {
  // react router
  const navigate = useNavigate();

  // Redux element
  const { cartAmounts } = useSelector((state) => state.cart);

  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <section className="checkout__section">
      <CustomBreadcrumbs title="Checkout" image={checkoutImage} />
      <div className="container">
        <div className="checkout__container">
          <div className="chekout__content">
            <CustomizeAccordion />
          </div>

          <div className="chekout__subtotal">
            <CheckoutSubtotal
              cartAmounts={cartAmounts}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
