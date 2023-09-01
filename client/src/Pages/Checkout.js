import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../app/features/auth/authApi";
import { useOrderCreateMutation } from "../app/features/orders/orderApi";
import checkoutImage from "../assets/banners/checkout4.jpg";
import CheckoutSubtotal from "../components/CheckoutSubtotal";
import CustomizeAccordion from "../components/CustomizeAccordion";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";

const Checkout = () => {
  // States
  const [paymentMethod, setPaymentMethod] = useState("card");

  // react router
  const navigate = useNavigate();

  // Redux element
  const { cartItems, cartAmounts, paymentInfo } = useSelector(
    (state) => state.cart
  );
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading, isError, data: user } = useGetProfileQuery();
  const [
    orderCreate,
    { isLoading: orderIsLoading, isError: orderIsError, error, data },
  ] = useOrderCreateMutation();

  // console.log(data);

  const handleCheckout = async () => {
    const orderData = {
      customer: {
        name: user?.name,
        image: user?.avatar,
      },
      orderItems: cartItems,
      shippingAddress: {
        phone_number: user?.phone,
        address: user?.address,
        city: user?.city,
        zip_code: user?.zip_code,
        country: user?.country,
      },
      shippingPrice: cartAmounts?.shipping,
      taxPrice: cartAmounts?.tax,
      totalPrice: cartAmounts?.total,
      paymentMethod: paymentMethod,
      paymentResult: paymentInfo,
      paymentStatus: "paid",
    };

    await orderCreate(orderData);
    navigate("/checkout");
  };
  return (
    <section className="checkout__section">
      <CustomBreadcrumbs title="Checkout" image={checkoutImage} />
      <div className="container">
        <div className="checkout__container">
          <div className="chekout__content">
            <CustomizeAccordion
              isLoading={isLoading}
              isError={isError}
              user={user}
              userInfo={userInfo}
              cartAmounts={cartAmounts}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>

          <div className="chekout__subtotal">
            <CheckoutSubtotal
              cartAmounts={cartAmounts}
              handleCheckout={handleCheckout}
              isLoading={orderIsLoading}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
