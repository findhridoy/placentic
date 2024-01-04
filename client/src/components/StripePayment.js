import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePaymentIntentMutation } from "../app/features/stripe/stripeApi";
import PaymentForm from "./PaymentForm";
import CustomAlert from "./controls/CustomAlert";
import StripePaymentSkeleton from "./skeletons/StripePaymentSkeleton";

const StripePayment = () => {
  // Redux element
  const { cartAmounts } = useSelector((state) => state.cart);
  const [paymentIntent, { isLoading, isError, error, data }] =
    usePaymentIntentMutation();

  useEffect(() => {
    const fetchRequest = async () => {
      await paymentIntent({ amount: cartAmounts?.total });
    };

    fetchRequest();
  }, [paymentIntent, cartAmounts]);

  return (
    <div className="stripePayment">
      {isLoading ? (
        <StripePaymentSkeleton />
      ) : isError ? (
        <CustomAlert severity="error" message={error?.data?.message} close />
      ) : data?.message ? (
        <CustomAlert severity="warning" message={data?.message} close />
      ) : (
        data?.clientSecret &&
        data?.publicSecret && (
          <Elements stripe={loadStripe(data?.publicSecret)}>
            <PaymentForm clientSecret={data?.clientSecret} />
          </Elements>
        )
      )}
    </div>
  );
};

export default StripePayment;
