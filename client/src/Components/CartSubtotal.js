import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartSubtotal = ({ shippingMode, cartItems }) => {
  // react router
  const navigate = useNavigate();

  const subtotal = cartItems
    ?.reduce((acc, item) => acc + item?.price * item?.quantity, 0)
    .toFixed(2);

  //
  // const handleCheckout =

  return (
    <div className="cartSubtotal">
      <h3 className="cartSubtotal__title">Order Summery</h3>
      <div className="cartSubtotal__subtotal">
        <span className="subtotal__text">
          Subtotal ( {cartItems?.length} • items )
        </span>
        <span className="subtotal__digit">${subtotal}</span>
      </div>

      <div className="cartSubtotal__shipping">
        <span className="subtotal__text">Shipping</span>
        {shippingMode === "free" && (
          <span className="subtotal__digit">Free</span>
        )}
        {shippingMode === "paid" && (
          <span className="subtotal__digit">$9.9</span>
        )}
      </div>

      <div className="cartSubtotal__total">
        <span className="subtotal__text">Total</span>
        <span className="subtotal__digit">
          $
          {shippingMode === "paid"
            ? Number(subtotal) + Number(9.9)
            : Number(subtotal)}
        </span>
      </div>

      <div className="cartSubtotal__btn btn btn__dark">
        <Button onClick={() => navigate("/checkout")}>
          <span className="btn__text">Proceed to checkout</span>
          <span className="btn__digit">
            $
            {shippingMode === "paid"
              ? Number(subtotal) + Number(9.9)
              : Number(subtotal)}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CartSubtotal;
