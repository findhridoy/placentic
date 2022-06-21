import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../Components/CartItem";
import CartSubtotal from "../Components/CartSubtotal";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";
import Layout from "../Layouts/Layout";

const Cart = () => {
  // States
  const [shippingMode, setShippingMode] = useState("free");

  // Redux elements
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Layout>
      <section className="cart__section ">
        <CustomBreadcrumbs title="Shopping Cart" />
        <div className="container">
          <div className="cart__header">
            <h2 className="cart__title">
              {cartItems?.length > 0
                ? " Your cart items"
                : " Your cart is empty!"}
            </h2>
            <Link className="cart__backLink" to="/">
              <ArrowBackIcon />
              Continue shopping
            </Link>
          </div>

          <div className="cart__content">
            <div className="cart__item">
              {cartItems?.map((cartItem) => (
                <CartItem cartItem={cartItem} key={cartItem?.product} />
              ))}
            </div>
            <div className="cart__checkout">
              <div className="cart__shipping">
                <FormControl>
                  <h4 className="shipping__title">Choose shipping mode:</h4>
                  <RadioGroup
                    aria-labelledby="shipping-radio-buttons-group"
                    name="shipping-radio-buttons-group"
                    value={shippingMode}
                    onChange={(e) => setShippingMode(e.target.value)}
                  >
                    <FormControlLabel
                      value="free"
                      control={<Radio size="small" />}
                      label="Store pickup ( In 20 min ) • FREE"
                    />
                    <FormControlLabel
                      value="paid"
                      control={<Radio size="small" />}
                      label="Delivery at home ( Under 2 - 4 day ) • $9.90"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="cart__subtotal">
                <CartSubtotal
                  shippingMode={shippingMode}
                  cartItems={cartItems}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
