import { Button } from "@mui/material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentInfo } from "../app/features/cart/cartSlice";

const PaymentForm = ({ clientSecret }) => {
  // State
  const [isProcessing, setProcessingTo] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  // Redux element
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleCardDetailsChange = (event) => {
    event.error && cogoToast.error(event.error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // our payment process starts here
    if (clientSecret) {
      const billingDetails = {
        email: userInfo?.email,
      };

      setProcessingTo(true);

      const cardElement = elements.getElement(CardNumberElement);

      try {
        const paymentMethodReq = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: billingDetails,
        });

        if (paymentMethodReq.error) {
          cogoToast.error(paymentMethodReq.error.message);
          setProcessingTo(false);
          return;
        }

        const confirmedCardPayment = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: paymentMethodReq.paymentMethod.id,
          }
        );

        if (confirmedCardPayment.error) {
          cogoToast.error(confirmedCardPayment.error);
          setProcessingTo(false);
          return;
        }

        // save data in storage
        dispatch(
          setPaymentInfo({
            paid_at: confirmedCardPayment?.paymentIntent?.created,
            payment_id: confirmedCardPayment?.paymentIntent?.id,
            status: confirmedCardPayment?.paymentIntent?.status,
            payment_method: "card",
            email_address: userInfo?.email,
            is_paid: true,
          })
        );
        cogoToast.success("Payment successful");
        setProcessingTo(false);
      } catch (err) {
        cogoToast.error(err.message);
      }
    } else {
      cogoToast.error("Error: Server could not initiate the payment process.");
    }
  };

  return (
    <div className="paymentForm">
      <form onSubmit={handleSubmit}>
        <span className="form__group">
          <label className="form__label">Card number</label>
          <CardNumberElement onChange={handleCardDetailsChange} />
        </span>

        <div className="form__grid">
          <span className="form__group">
            <label className="form__label">Expiration date</label>
            <CardExpiryElement onChange={handleCardDetailsChange} />
          </span>

          <span className="form__group">
            <label className="form__label">CVC</label>
            <CardCvcElement onChange={handleCardDetailsChange} />
          </span>
        </div>

        <div className="btn small__btn btn__dark">
          <Button
            disabled={isProcessing || !stripe || !elements}
            type="submit"
            style={{ width: "100%", marginTop: "1.2rem" }}
          >
            {isProcessing ? "Proccesing" : "Pay now"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
