// import { CardNumberElement, PaymentElement } from "@stripe/react-stripe-js";

import { Button } from "@mui/material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";

const CheckoutForm = ({ condition, orderId }) => {
  const [cardName, setCardName] = useState("");
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState();

  const stripe = useStripe();
  const elements = useElements();

  // use context
  const { addPaymentMethod, updatePayment } = useGlobalContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    if (cardName === "" || cardName === " ") {
      setErrors({
        message: "Your card name is incomplete.",
      });
    }
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      // eslint-disable-next-line no-dupe-keys
      card: elements.getElement(CardExpiryElement),
      // eslint-disable-next-line no-dupe-keys
      card: elements.getElement(CardCvcElement),
    });
    setLoading(false);
    if (cardName && error) {
      setErrors(error);
    }
    if (paymentMethod && !condition) {
      setErrors();
      addPaymentMethod(paymentMethod.id);
    }
    if (condition && paymentMethod) {
      setErrors();
      updatePayment(orderId, paymentMethod.id);
    }
  };

  return (
    <div className="checkoutForm">
      {errors && (
        <div className="ss__error">
          {/* <WarningIcon className="ss__error--icon" /> */}
          <span className="ss__error--text">{errors?.message}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="checkoutForm__form">
        <span className="form__group">
          <label className="form__label">Name on Card</label>
          <input
            className="form__control"
            type="text"
            placeholder="Visa or master card"
            onChange={(e) => setCardName(e.target.value)}
          />
        </span>
        <span className="form__group">
          <label className="form__label">Card number</label>
          <CardNumberElement />
        </span>

        <div className="form__divided">
          <span className="form__group">
            <label className="form__label">Expiration date</label>
            <CardExpiryElement />
          </span>

          <span className="form__group">
            <label className="form__label">CVC</label>
            <CardCvcElement />
          </span>
        </div>

        <div className="form__btn">
          <Button
            type="submit"
            disabled={!stripe || !elements}
            variant="contained"
          >
            {loading ? "Processing" : "Pay"}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CheckoutForm;
