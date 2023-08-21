import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useOrderPaymentMutation } from "../app/features/orders/orderApi";
import PaymentForm from "./PaymentForm";
import CustomAlert from "./controls/CustomAlert";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const StripePayment = () => {
  // Redux element
  const { cartAmounts } = useSelector((state) => state.cart);
  const [orderPayment, { isLoading, isError, error, data }] =
    useOrderPaymentMutation();

  useEffect(() => {
    const fetchRequest = async () => {
      await orderPayment(cartAmounts);
    };

    fetchRequest();
  }, [orderPayment, cartAmounts]);

  const appearance = {
    theme: "stripe",

    variables: {
      colorDanger: "#e31a16ea",
      fontFamily: "Poppins, sans-serif",
      spacingUnit: "3px",
      borderRadius: "0px",
    },
    rules: {
      ".Label": {
        fontFamily: "Poppins, sans-serif",
        fontSize: "0.8rem",
        fontWeight: "600",
      },
      ".Input": {
        fontSize: "0.8rem",
        fontWeight: "500",
        color: "#3d3e42",
        borderColor: "#c2c2c2",
        boxShadow: "none",
      },
      ".Input:focus": {
        boxShadow: "none",
        borderColor: "none",
      },
      ".Input--invalid": {
        boxShadow: "none",
        borderColor: "none",
      },
      ".Error": {
        fontSize: "0.78rem",
      },
    },
  };

  const options = {
    clientSecret: data?.clientSecret,
    appearance,
  };

  return (
    <div className="stripePayment">
      {isError && (
        <CustomAlert severity="error" message={error?.data?.message} close />
      )}

      {!isLoading && data?.clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
