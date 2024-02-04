import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Badge, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLoggedOut } from "../app/features/auth/authSlice";

const ProfileHeader = ({ title, filter, setFilter }) => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  // Redux element
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  // Handle dropdown
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  // Logout functionality
  const logout = () => {
    dispatch(userLoggedOut());
  };

  return (
    <header className="profileHeader">
      <nav className="dh__nav">
        {showSearchBox ? (
          <div className="nav__searchBox">
            <input
              type="text"
              placeholder="Search..."
              autoComplete="false"
              value={filter || ""}
              onChange={(e) => setFilter(e.target.value || undefined)}
            />
            <IconButton
              aria-label="close"
              onClick={() => setShowSearchBox(false)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        ) : (
          <>
            <h3 className="nav__title">{title}</h3>
            <div className="nav__menu">
              <ul className="nav__list">
                <li className="nav__item">
                  <IconButton
                    aria-label="search"
                    onClick={() => setShowSearchBox(true)}
                  >
                    <SearchIcon />
                  </IconButton>
                </li>
                <li className="nav__item">
                  <IconButton aria-label="notification">
                    <Badge badgeContent={1}>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </li>

                <li className="nav__item">
                  <NavLink className="nav__link" to="/cart">
                    <IconButton aria-label="cart">
                      <Badge badgeContent={cartItems?.length}>
                        <LocalMallIcon />
                      </Badge>
                    </IconButton>
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink className="nav__link" to="/wishlist">
                    <IconButton aria-label="love">
                      <Badge badgeContent={wishlistItems?.length}>
                        <FavoriteIcon />
                      </Badge>
                    </IconButton>
                  </NavLink>
                </li>

                {userInfo?.email && (
                  <li className="nav__item">
                    <IconButton
                      aria-label="avatar"
                      size="small"
                      onClick={handleDropdown}
                    >
                      <Avatar
                        alt={userInfo?.name}
                        src={userInfo?.avatar}
                        sx={{ width: 35, height: 35 }}
                      />
                    </IconButton>
                    {/* Dropdown menu */}
                    <div
                      className={
                        dropdown
                          ? "dropdown__menu dropdown__show"
                          : "dropdown__menu"
                      }
                    >
                      <ul className="dropdown__list">
                        {userInfo?.email && userInfo?.isAdmin && (
                          <li className="dropdown__item">
                            <NavLink
                              to="/dashboard/dashboard"
                              className={({ isActive }) =>
                                isActive
                                  ? "dropdown__link active__link"
                                  : "dropdown__link"
                              }
                              onClick={handleDropdown}
                            >
                              <DashboardIcon />
                              <span className="dropdown__text">Dashboard</span>
                            </NavLink>
                          </li>
                        )}
                        <li className="dropdown__item">
                          <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                              isActive
                                ? "dropdown__link active__link"
                                : "dropdown__link"
                            }
                            onClick={handleDropdown}
                          >
                            <AccountCircleIcon />
                            <span className="dropdown__text">Profile</span>
                          </NavLink>
                        </li>
                        <li className="dropdown__item">
                          <NavLink
                            to="/orders"
                            className={({ isActive }) =>
                              isActive
                                ? "dropdown__link active__link"
                                : "dropdown__link"
                            }
                            onClick={handleDropdown}
                          >
                            <AddShoppingCartIcon />
                            <span className="dropdown__text">Orders</span>
                          </NavLink>
                        </li>
                        <li className="dropdown__item">
                          <NavLink
                            to=""
                            className="dropdown__link"
                            onClick={logout}
                          >
                            <LogoutIcon />
                            <span className="dropdown__text">Logout</span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default ProfileHeader;
