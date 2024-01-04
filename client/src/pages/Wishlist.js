import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import wishlistImage from "../assets/banners/cart5.jpg";
import CustomAlert from "../components/controls/CustomAlert";
import CustomBreadcrumbs from "./../components/controls/CustomBreadcrumbs";
import Layout from "./../layouts/Layout";

const WishlistItem = ({ wishlistItem }) => {
  return (
    <div className="cartItem">
      <div className="cartItem__image">
        <img src={wishlistItem?.image} alt={wishlistItem?.title} />
      </div>
      <div className="cartItem__content">
        <div className="cartItem__data">
          <div className="cartItem__details">
            <Link to="/">
              <h3 className="cartItem__title">{wishlistItem?.title}</h3>
            </Link>

            <span className="cartItem__price">${wishlistItem?.price}</span>
            <span className="cartItem__stock">
              {wishlistItem?.countInStock > 0 ? (
                "In Stock"
              ) : (
                <span className="cartItem__countOutStock">Out Of Stock</span>
              )}
            </span>

            <p className="wishlistItem__desc">{wishlistItem?.description}</p>
          </div>

          <span className="cartItem__totalPrice">
            ${wishlistItem?.totalPrice}
          </span>
        </div>

        <div className="cartItem__action">
          {/* <div className="cartItem__count">
            <IconButton
              onClick={() => handleQuantity("decrease")}
              disabled={cartItem?.quantity < 2}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
            <input type="text" disabled value={cartItem?.quantity} />
            <IconButton
              onClick={() => handleQuantity("increase")}
              disabled={
                cartItem?.quantity === cartItem?.countInStock ||
                cartItem?.countInStock === 0
              }
              size="small"
            >
              <AddIcon />
            </IconButton>
          </div> */}

          {/* <div className="cartItem__button--group">
            {existWishlistItem ? (
              <span className="cartItem__btn active__btn">
                <FavoriteIcon fontSize="small" />
                <span className="btn__text">Saved</span>
              </span>
            ) : (
              <span
                className="cartItem__btn"
                onClick={() => handleAddToWishlist(cartItem)}
              >
                <FavoriteIcon fontSize="small" />
                <span className="btn__text">Save</span>
              </span>
            )}

            <span
              className="cartItem__btn"
              onClick={() => handleRemoveFromCart(cartItem)}
            >
              <DeleteIcon fontSize="small" />
              <span className="btn__text">Remove</span>
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  // Redux elements
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <Layout>
      <section className="wishlist__section">
        <CustomBreadcrumbs title="Your wishlist" image={wishlistImage} />
        <div className="container">
          {wishlistItems?.length > 0 ? (
            <div className="wishlist__content">
              {wishlistItems?.map((wishlistItem) => (
                <WishlistItem
                  wishlistItem={wishlistItem}
                  key={wishlistItem?._id}
                />
              ))}
            </div>
          ) : (
            <CustomAlert
              severity="info"
              message="Your wishlist is currently empty."
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Wishlist;
