import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartImage from "../assets/banners/cart1.jpg";
import { shippingOption } from "../assets/json/radioData";
import CartItem from "../components/CartItem";
import CartSubtotal from "../components/CartSubtotal";
import CustomAlert from "../components/controls/CustomAlert";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";
import CustomRadioGroup from "../components/controls/CustomRadioGroup";
import Layout from "../layouts/Layout";

const Cart = () => {
  // States
  const [radioMode, setRadioMode] = useState("free");

  // Redux elements
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Layout>
      <section className="cart__section ">
        <CustomBreadcrumbs title="Shopping cart" image={cartImage} />
        <div className="container">
          <div className="cart__header">
            <h2 className="cart__title">Your cart items</h2>
            <Link className="cart__backLink" to="/">
              <ArrowBackIcon />
              Continue shopping
            </Link>
          </div>

          {cartItems?.length > 0 ? (
            <div className="cart__content">
              <div className="cart__item">
                {cartItems?.map((cartItem) => (
                  <CartItem cartItem={cartItem} key={cartItem?._id} />
                ))}
              </div>
              <div className="cart__checkout">
                <div className="cart__shipping">
                  <h4 className="shipping__title">Choose shipping mode:</h4>
                  <CustomRadioGroup
                    radioMode={radioMode}
                    setRadioMode={setRadioMode}
                    radioData={shippingOption}
                  />
                </div>

                <div className="cart__subtotal">
                  <CartSubtotal
                    shippingMode={radioMode}
                    cartItems={cartItems}
                  />
                </div>
              </div>
            </div>
          ) : (
            <CustomAlert
              severity="info"
              message="Your cart is currently empty."
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
