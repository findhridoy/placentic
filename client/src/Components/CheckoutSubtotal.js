import CustomButton from "./controls/CustomButton";

const CheckoutSubtotal = ({
  cartAmounts,
  handleCheckout,
  isLoading,
  paymentMethod,
}) => {
  return (
    <div className="cartSubtotal">
      <h3 className="cartSubtotal__title">Order Summery</h3>
      <div className="cartSubtotal__subtotal">
        <span className="subtotal__text">
          Subtotal ( {cartAmounts?.items} • items )
        </span>
        <span className="subtotal__digit">${cartAmounts?.subtotal}</span>
      </div>

      <div className="cartSubtotal__subtotal">
        <span className="subtotal__text">TAX</span>
        <span className="subtotal__digit">${cartAmounts?.tax}</span>
      </div>

      <div className="cartSubtotal__shipping">
        <span className="subtotal__text">Shipping</span>

        <span className="subtotal__digit">${cartAmounts?.shipping}</span>
      </div>

      <div className="cartSubtotal__total">
        <span className="subtotal__text">Total</span>
        <span className="subtotal__digit">${cartAmounts?.total}</span>
      </div>

      <CustomButton
        className="checkoutSubtotal__btn btn btn__dark"
        text="Place order"
        loading={isLoading}
        onClick={handleCheckout}
        disabled={paymentMethod === "card"}
      />
    </div>
  );
};

export default CheckoutSubtotal;
