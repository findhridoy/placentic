import AddBoxIcon from "@mui/icons-material/AddBox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import placentic from "../../assets/logo/placentic.png";

const DashboardMenu = () => (
  <aside className="dashboard__menu">
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
          to="/dashboard/dashboard"
        >
          <DashboardIcon />
          <span className="menu__text">Dashboard</span>
        </NavLink>
      </li>
      <li className="menu__item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "menu__link active__link" : "menu__link"
          }
          to="/dashboard/orders"
        >
          <AddShoppingCartIcon />
          <span className="menu__text">Orders</span>
        </NavLink>
      </li>
      <li className="menu__item">
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
      </li>
    </ul>
  </aside>
);

export default DashboardMenu;
