import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Badge, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import placentic from "../assets/logo/placentic.png";

const Header = () => {
  const [header, setHeader] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  // Redux element
  const dispatch = useDispatch();
  // const { true } = useSelector((state) => state.userLogin);
  // const { cartItems } = useSelector((state) => state.cart);
  // const { wishlistItems } = useSelector((state) => state.wishlist);

  // Header scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= 45) {
        setHeader(true);
      } else {
        setHeader(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Handle dropdown
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  // Logout functionality
  const logout = () => {
    // dispatch(logoutUser());
  };
  return (
    <header className={header ? "header header__shadow" : "header"}>
      <nav className="nav container">
        {showSearchBox ? (
          <div className="nav__searchBox">
            <input type="text" placeholder="Search..." autoComplete="false" />
            <IconButton
              aria-label="close"
              onClick={() => setShowSearchBox(false)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        ) : (
          <>
            <div className="nav__logo">
              <Link to="/">
                <img className="logo" src={placentic} alt="brand-logo" />
              </Link>
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
                  <NavLink className="nav__link" to="/catalog">
                    <CategoryIcon />
                    <span className="nav__text">Category</span>
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink className="nav__link" to="/about">
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
                <li className="nav__item">
                  <NavLink className="nav__link" to="/login">
                    <LoginIcon />
                    <span className="nav__text">Login</span>
                  </NavLink>
                </li>
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
                      <Badge badgeContent={true?.length}>
                        <LocalMallIcon />
                      </Badge>
                    </IconButton>
                  </NavLink>
                </li>
                <li className="nav__item2">
                  <NavLink className="nav__link2" to="/favourites">
                    <IconButton aria-label="love">
                      <Badge badgeContent={true?.length}>
                        <FavoriteBorderIcon />
                      </Badge>
                    </IconButton>
                  </NavLink>
                </li>
                {true?.email && (
                  <li className="nav__item2">
                    <IconButton
                      aria-label="avatar"
                      size="small"
                      onClick={handleDropdown}
                    >
                      <Avatar
                        alt={true?.name}
                        src={true?.avatar}
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
                        {true?.email && true?.isAdmin && (
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
