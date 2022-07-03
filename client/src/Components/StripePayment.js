import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51LGMCHGPdR4pQodpRcoBnmBuC8tZgoHE3RpntydsjAYjwawGiy26b3aqrNx5gugQC64zGj7aI5J6SgAHcIA8teQn00FoWs2R4t"
);

const StripePayment = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const fetcher = async () => {
      const { data } = await axios.post("api/create-payment-intent", {
        items: [{ id: "xl-tshirt" }],
      });

      setClientSecret(data?.clientSecret);
    };

    fetcher();
  }, [clientSecret]);

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
    clientSecret,
    appearance,
  };

  return (
    <div className="stripePayment">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
