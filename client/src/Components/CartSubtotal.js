import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartSubtotal = ({ shippingMode, cartItems }) => {
  // react router
  const navigate = useNavigate();

  // subtotal price
  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item?.price * item?.quantity,
    0
  );

  // shipping price
  const shipping =
    shippingMode === "free" ? 0 : shippingMode === "paid" ? 9.9 : 0;

  // price object
  const amount = {
    items: cartItems?.length,
    subtotal: Number(subtotal)?.toFixed(2),
    shipping: Number(shipping)?.toFixed(2),
    total: (Number(subtotal) + Number(shipping))?.toFixed(2),
  };

  // Store amount and change route
  const handleCheckout = () => {
    sessionStorage.setItem("amount", JSON.stringify(amount));
    navigate("/checkout");
  };

  return (
    <div className="cartSubtotal">
      <h3 className="cartSubtotal__title">Order Summery</h3>
      <div className="cartSubtotal__subtotal">
        <span className="subtotal__text">
          Subtotal ( {amount?.items} • items )
        </span>
        <span className="subtotal__digit">${amount?.subtotal}</span>
      </div>

      <div className="cartSubtotal__shipping">
        <span className="subtotal__text">Shipping</span>

        <span className="subtotal__digit">${amount?.shipping}</span>
      </div>

      <div className="cartSubtotal__total">
        <span className="subtotal__text">Total</span>
        <span className="subtotal__digit">${amount?.total}</span>
      </div>

      <div className="cartSubtotal__btn btn btn__dark">
        <Button onClick={handleCheckout}>
          <span className="btn__text">Proceed to checkout</span>
          <span className="btn__digit">${amount?.total}</span>
        </Button>
      </div>
    </div>
  );
};

export default CartSubtotal;
