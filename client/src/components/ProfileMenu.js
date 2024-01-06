import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import placentic from "../assets/logo/placentic.png";

const ProfileMenu = () => (
  <aside className="profileMenu">
    <div className="nav__logo">
      <Link to="/">
        <img className="logo" src={placentic} alt="brand-logo" />
      </Link>
    </div>
    <ul className="menu__list">
      <li className="menu__item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "menu__link active__link" : "menu__link"
          }
          to="/profile"
        >
          <AccountCircleIcon />
          <span className="menu__text">My Profile</span>
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "menu__link active__link" : "menu__link"
          }
          to="/orders"
        >
          <AddShoppingCartIcon />
          <span className="menu__text">My Orders</span>
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "menu__link active__link" : "menu__link"
          }
          to="/wishlist"
        >
          <FavoriteIcon />
          <span className="menu__text">My Wishlist</span>
        </NavLink>
      </li>

      {/* <li className="menu__item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "menu__link active__link" : "menu__link"
          }
          to="/dashboard/categories"
        >
          <CategoryIcon />
          <span className="menu__text">Categories</span>
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "menu__link active__link" : "menu__link"
          }
          to="/dashboard/products"
        >
          <AddBoxIcon />
          <span className="menu__text">Products</span>
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "menu__link active__link" : "menu__link"
          }
          to="/dashboard/users"
        >
          <GroupIcon />
          <span className="menu__text">Users</span>
        </NavLink>
      </li> */}
    </ul>
  </aside>
);

export default ProfileMenu;
