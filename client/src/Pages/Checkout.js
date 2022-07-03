import CheckoutSubtotal from "../Components/CheckoutSubtotal";
import CustomAccordion from "../Components/CustomAccordion";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";

const Checkout = () => {
  return (
    <section className="checkout__section section">
      <div className="container">
        <CustomBreadcrumbs title="Checkout" />

        <div className="checkout__container">
          <div className="chekout__content">
            {/* <div className="checkout__login">
              <div className="login__checkbox">
                <span className="checkbox__text">a</span>
              </div>
              <div className="login__details">
                <div className="login__check">
                  <span className="login__text">Login</span>
                  <CheckIcon />
                </div>
                <span className="user__name">User</span>
                <span className="user__phone">024652124154</span>
              </div>
            </div> */}

            <CustomAccordion />
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
