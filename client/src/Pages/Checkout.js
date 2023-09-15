import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../app/features/auth/authApi";
import { resetCart } from "../app/features/cart/cartSlice";
import { useOrderCreateMutation } from "../app/features/orders/orderApi";
import checkoutImage from "../assets/banners/checkout4.jpg";
import CheckoutSubtotal from "../components/CheckoutSubtotal";
import CustomizeAccordion from "../components/CustomizeAccordion";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";

const Checkout = () => {
  // react router
  const navigate = useNavigate();

  // Redux element
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems, cartAmounts, paymentInfo } = useSelector(
    (state) => state.cart
  );

  const { isLoading, isError, data: user } = useGetProfileQuery();
  const [
    orderCreate,
    { isLoading: orderIsLoading, isError: orderIsError, error, data },
  ] = useOrderCreateMutation();

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
      deliveryStatus:
        cartAmounts?.shippingMethod === "free" ? "free" : "prepared",
      shippingPrice: cartAmounts?.shipping,
      taxPrice: cartAmounts?.tax,
      totalPrice: cartAmounts?.total,
      paymentResult: paymentInfo,
    };

    await orderCreate(orderData);
  };

  useEffect(() => {
    if (orderIsError) {
      cogoToast.error(error?.data?.message);
    }
    if (data?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (data?.success) {
      cogoToast.success("Product has been created.");
      dispatch(resetCart());
      navigate("/profile");
    }
  }, [orderIsError, error, data, dispatch, navigate]);

  useEffect(() => {
    if (!cartItems?.length && !Object.keys(cartAmounts)?.length) {
      navigate("/");
    }
  }, [cartItems, cartAmounts, navigate]);

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
              paymentInfo={paymentInfo}
            />
          </div>

          <div className="chekout__subtotal">
            <CheckoutSubtotal
              cartAmounts={cartAmounts}
              handleCheckout={handleCheckout}
              isLoading={orderIsLoading}
              paymentInfo={paymentInfo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
