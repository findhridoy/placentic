// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import PaymentForm from "./PaymentForm";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
// const StripeCheckoutElements = ({ condition, orderId }) => {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm condition={condition} orderId={orderId} />
//     </Elements>
//   );
// };

// export default StripeCheckoutElements;

// // import { CardNumberElement, PaymentElement } from "@stripe/react-stripe-js";

// import { Button } from "@mui/material";
// import {
//   CardCvcElement,
//   CardExpiryElement,
//   CardNumberElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { useState } from "react";

// const CheckoutForm = ({ condition, orderId }) => {
//   const [cardName, setCardName] = useState("");
//   const [errors, setErrors] = useState();
//   const [loading, setLoading] = useState();

//   const stripe = useStripe();
//   const elements = useElements();

//   // use context
//   // const { addPaymentMethod, updatePayment } = useGlobalContext();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (elements == null) {
//       return;
//     }
//     if (cardName === "" || cardName === " ") {
//       setErrors({
//         message: "Your card name is incomplete.",
//       });
//     }
//     setLoading(true);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardNumberElement),
//       // eslint-disable-next-line no-dupe-keys
//       card: elements.getElement(CardExpiryElement),
//       // eslint-disable-next-line no-dupe-keys
//       card: elements.getElement(CardCvcElement),
//     });
//     setLoading(false);
//     if (cardName && error) {
//       setErrors(error);
//     }
//     if (paymentMethod && !condition) {
//       setErrors();
//       // addPaymentMethod(paymentMethod.id);
//     }
//     if (condition && paymentMethod) {
//       setErrors();
//       // updatePayment(orderId, paymentMethod.id);
//     }
//   };

//   return (
//     <div className="checkoutForm">
//       {errors && (
//         <div className="ss__error">
//           {/* <WarningIcon className="ss__error--icon" /> */}
//           <span className="ss__error--text">{errors?.message}</span>
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="checkoutForm__form">
//         <span className="form__group">
//           <label className="form__label">Name on Card</label>
//           <input
//             className="form__control"
//             type="text"
//             placeholder="Visa or master card"
//             onChange={(e) => setCardName(e.target.value)}
//           />
//         </span>
//         <span className="form__group">
//           <label className="form__label">Card number</label>
//           <CardNumberElement />
//         </span>

//         <div className="form__divided">
//           <span className="form__group">
//             <label className="form__label">Expiration date</label>
//             <CardExpiryElement />
//           </span>

//           <span className="form__group">
//             <label className="form__label">CVC</label>
//             <CardCvcElement />
//           </span>
//         </div>

//         <div className="form__btn">
//           <Button
//             type="submit"
//             disabled={!stripe || !elements}
//             variant="contained"
//           >
//             {loading ? "Processing" : "Pay"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default CheckoutForm;

// [![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=findhridoy)](https://github.com/anuraghazra/github-readme-stats)

// ![GitHub stats](https://github-readme-stats.vercel.app/api?username=findhridoy&show_icons=true)
// ![GitHub streak stats](https://github-readme-streak-stats.herokuapp.com/?user=findhridoy)
// ![GitHub Activity Graph](https://activity-graph.herokuapp.com/graph?username=findhridoy)

/* <div className="dp__header">
{isLoading ? (
  <Skeleton width={140} animation="wave" height={35} />
) : (
  <h4 className="header__title">Product list</h4>
)}
<div className="dp__categories">
  {isLoading ? (
    <Skeleton
      width={130}
      variant="rectangular"
      animation="wave"
      height={35}
    />
  ) : (
    <div className="btn small__btn btn__dark">
      <Button type="button" onClick={() => setOpen(true)}>
        <span className="btn__text">Add Product</span>
        <AddIcon />
      </Button>
    </div>
  )}
</div>
</div> */

// import { Button } from "@mui/material";
// import {
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import "../sass/components/stripePayment.css";
// import CustomAlert from "./controls/CustomAlert";

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case "succeeded":
//           setMessage("Payment succeeded!");
//           break;
//         case "processing":
//           setMessage("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           setMessage("Your payment was not successful, please try again.");
//           break;
//         default:
//           setMessage("Something went wrong.");
//           break;
//       }

//       console.log(paymentIntent);
//     });
//   }, [stripe]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: "http://localhost:3000/checkout",
//       },
//     });

//     if (error.type === "card_error" || error.type === "validation_error") {
//       setMessage(error.message);
//     } else {
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   const paymentElement = {
// layout: {
//   type: "accordion",
//   defaultCollapsed: false,
//   radios: true,
//   spacedAccordionItems: false,
// },
// paymentMethodOrder: ["apple_pay", "google_pay", "card", "klarna"],
// };

// return (
//   <div className="paymentForm">
//     <form id="payment-form" onSubmit={handleSubmit}>
//       {message && <CustomAlert severity="error" message={message} close />}
//       <br />

//       <PaymentElement />
//       <div className="btn small__btn btn__dark">
//         <Button
//           disabled={isLoading || !stripe || !elements}
//           type="submit"
//           id="submit"
//           style={{ width: "100%", marginTop: "1.2rem" }}
//         >
//           {isLoading ? "Proccesing" : "Pay now"}
//         </Button>
//       </div>
//     </form>

/* <div className="craditCard__title_section">
        <div className="craditCard__title">
          <p>Cradit Card</p>
          <p>Lorem ipsum dolor sit elit. Sequi, reprehenderit?</p>
        </div>
        <div className="craditCard__image">
          <img
            src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg"
            alt="icon"
          />
          <img
            src="https://js.stripe.com/v3/fingerprinted/img/visa-365725566f9578a9589553aa9296d178.svg"
            alt="icon"
          />
          <img
            src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg"
            alt="icon"
          />
        </div>

        <label>
          Card number
          <CardNumberElement />
        </label>

        <div className="payment__form--flex">
          <label>
            Expiration date
            <CardExpiryElement />
          </label>
          <label>
            CVC Code
            <CardCvcElement />
          </label>
        </div>
      </div> */
//     </div>
//   );
// };

// export default PaymentForm;
