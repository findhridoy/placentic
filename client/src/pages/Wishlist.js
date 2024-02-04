import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import wishlistImage from "../assets/banners/cart5.jpg";
import CustomAlert from "../components/controls/CustomAlert";
import Layout from "../layouts/Layout";
import CustomBreadcrumbs from "./../components/controls/CustomBreadcrumbs";

const WishlistItem = ({ wishlistItem }) => {
  return (
    <div className="wishlistItem">
      <div className="wishlistItem__image">
        <img src={wishlistItem?.image} alt={wishlistItem?.title} />
      </div>
      <div className="wishlistItem__content">
        <div className="wishlistItem__data">
          <div className="wishlistItem__details">
            <Link to="/">
              <h3 className="wishlistItem__title">{wishlistItem?.title}</h3>
            </Link>

            <span className="wishlistItem__price">${wishlistItem?.price}</span>
            <span className="wishlistItem__stock">
              {wishlistItem?.countInStock > 0 ? (
                "In Stock"
              ) : (
                <span className="wishlistItem__countOutStock">
                  Out Of Stock
                </span>
              )}
            </span>

            <p className="wishlistItem__desc">{wishlistItem?.description}</p>
          </div>

          <span className="wishlistItem__totalPrice">
            ${wishlistItem?.totalPrice}
          </span>
        </div>

        <div className="wishlistItem__action">
          <div className="wishlistItem__count">
            <IconButton
              // onClick={() => handleQuantity("decrease")}
              // disabled={wishlistItem?.quantity < 2}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
            <input
              type="text"
              disabled
              // value={wishlistItem?.quantity}
            />
            <IconButton
              // onClick={() => handleQuantity("increase")}
              // disabled={
              //   wishlistItem?.quantity === wishlistItem?.countInStock ||
              //   wishlistItem?.countInStock === 0
              // }
              size="small"
            >
              <AddIcon />
            </IconButton>
          </div>

          <div className="wishlistItem__button--group">
            {/* {existWishlistItem ? ( */}
            <span className="wishlistItem__btn active__btn">
              <FavoriteIcon fontSize="small" />
              <span className="btn__text">Saved</span>
            </span>
            {/* ) : ( */}
            <span
              className="wishlistItem__btn"
              // onClick={() => handleAddToWishlist(wishlistItem)}
            >
              <FavoriteIcon fontSize="small" />
              <span className="btn__text">Save</span>
            </span>
            {/* )} */}

            <span
              className="wishlistItem__btn"
              // onClick={() => handleRemoveFromCart(wishlistItem)}
            >
              <DeleteIcon fontSize="small" />
              <span className="btn__text">Remove</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  // Redux elements
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <Layout title="Your wishlist">
      <div className="wishlist__section">
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
      </div>
    </Layout>
  );
};

export default Wishlist;
