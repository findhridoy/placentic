import { Button } from "@mui/material";

const CheckoutSubtotal = () => {
  // react router
  //   const navigate = useNavigate();

  //   Get amout from session storage
  const amount = sessionStorage.getItem("amount")
    ? JSON.parse(sessionStorage.getItem("amount"))
    : {};

  const handleCheckout = () => {
    // navigate("/checkout");
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
          <span className="btn__text">Place order</span>
          <span className="btn__digit">${amount?.total}</span>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSubtotal;
