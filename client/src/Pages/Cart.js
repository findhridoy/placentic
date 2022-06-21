import CartItem from "../Components/CartItem";
import Layout from "../Layouts/Layout";

const Cart = () => {
  return (
    <Layout>
      <section className="cart__section section">
        <div className="container">
          <div className="cart__content">
            <div className="cart__item">
              <CartItem />
            </div>
            <div className="cart__subtotal"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
