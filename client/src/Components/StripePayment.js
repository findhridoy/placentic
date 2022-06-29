import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const StripeCheckoutElements = ({ condition, orderId }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm condition={condition} orderId={orderId} />
    </Elements>
  );
};

export default StripeCheckoutElements;
