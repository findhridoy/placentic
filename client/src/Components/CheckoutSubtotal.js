import { Button, CircularProgress } from "@mui/material";

const CheckoutSubtotal = ({ cartAmounts, handleCheckout, isLoading }) => {
  return (
    <div className="cartSubtotal">
      <h3 className="cartSubtotal__title">Order Summery</h3>
      <div className="cartSubtotal__subtotal">
        <span className="subtotal__text">
          Subtotal ( {cartAmounts?.items} • items )
        </span>
        <span className="subtotal__digit">${cartAmounts?.subtotal}</span>
      </div>

      <div className="cartSubtotal__shipping">
        <span className="subtotal__text">Shipping</span>

        <span className="subtotal__digit">${cartAmounts?.shipping}</span>
      </div>

      <div className="cartSubtotal__total">
        <span className="subtotal__text">Total</span>
        <span className="subtotal__digit">${cartAmounts?.total}</span>
      </div>

      <div className="cartSubtotal__btn btn small__btn btn__dark">
        <Button onClick={handleCheckout} disabled={isLoading}>
          {isLoading ? (
            <CircularProgress color="inherit" size={20} thickness={4} />
          ) : (
            <>
              <span className="btn__text">Place order</span>
              <span className="btn__digit">${cartAmounts?.total}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSubtotal;
