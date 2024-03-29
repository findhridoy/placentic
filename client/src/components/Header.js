import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Badge, IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { userLoggedOut } from "../app/features/auth/authSlice";
import placentic from "../assets/logo/placentic.png";
import useDebounce from "../hooks/useDebounce";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  // States
  const [sticky, setSticky] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  // Redux element
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  // sticky header function
  const scrollCallback = (window.onscroll = () => {
    if (scroll >= window.scrollY && window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
    setScroll(window.scrollY);
  });

  // custom timeout hook
  useDebounce(true, 0, scrollCallback);

  // Handle dropdown
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  // Logout functionality
  const logout = () => {
    dispatch(userLoggedOut());
  };

  return (
    <header
      className={sticky || showSearchBox ? "header header__sticky" : "header"}
    >
      <nav className="nav container">
        {showSearchBox ? (
          <HeaderSearch onClick={() => setShowSearchBox(false)} />
        ) : (
          <>
            <div className="nav__logo">
              <Link to="/">
                <img className="logo" src={placentic} alt="brand-logo" />
              </Link>
            </div>

            <div className="nav__menu1">
              <MenuIcon />
              <span>Menu</span>
            </div>

            <div className="nav__menu">
              <ul className="nav__list">
                <li className="nav__item">
                  <NavLink className="nav__link" to="/collection">
                    <CollectionsBookmarkIcon />
                    <span className="nav__text">Collection</span>
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink className="nav__link" to="/category">
                    <CategoryIcon />
                    <span className="nav__text">Category</span>
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink className="nav__link" to="/about_us">
                    <PersonOutlineIcon />
                    <span className="nav__text">About Us</span>
                  </NavLink>
                </li>

                <li className="nav__item">
                  <NavLink className="nav__link" to="/blog">
                    <LibraryBooksIcon />
                    <span className="nav__text">Blog</span>
                  </NavLink>
                </li>

                {/* <li className="nav__item">
                  <NavLink to="/orders" className="nav__link">
                    <AddShoppingCartIcon />
                    <span className="nav__text">Orders</span>
                  </NavLink>
                </li> */}

                {userInfo?.email ? (
                  <li className="nav__item sm__screen">
                    <NavLink to="/profile" className="nav__link">
                      <AccountCircleIcon />
                      <span className="nav__text">Profile</span>
                    </NavLink>
                  </li>
                ) : (
                  <li className="nav__item">
                    <NavLink className="nav__link" to="/login">
                      <LoginIcon />
                      <span className="nav__text">Login</span>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>

            <div className="nav__menu2">
              <ul className="nav__list2">
                <li className="nav__item2">
                  <IconButton
                    aria-label="search"
                    onClick={() => setShowSearchBox(true)}
                  >
                    <SearchIcon />
                  </IconButton>
                </li>
                <li className="nav__item2">
                  <NavLink className="nav__link2" to="/cart">
                    <IconButton aria-label="cart">
                      <Badge badgeContent={cartItems?.length}>
                        <LocalMallIcon />
                      </Badge>
                    </IconButton>
                  </NavLink>
                </li>
                <li className="nav__item2">
                  <NavLink className="nav__link2" to="/wishlist">
                    <IconButton aria-label="love">
                      <Badge badgeContent={wishlistItems?.length}>
                        <FavoriteIcon />
                      </Badge>
                    </IconButton>
                  </NavLink>
                </li>
                {userInfo?.email && (
                  <li className="nav__item2">
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

export default Header;
