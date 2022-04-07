import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LoginIcon from "@mui/icons-material/Login";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import placentic from "../Assets/logo/placentic.png";

const Header = () => {
  const [header, setHeader] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

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
            {" "}
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
                      <LocalMallIcon />
                    </IconButton>
                  </NavLink>
                </li>
                <li className="nav__item2">
                  <NavLink className="nav__link2" to="/favourites">
                    <IconButton aria-label="love">
                      <FavoriteBorderIcon />
                    </IconButton>
                  </NavLink>
                </li>
              </ul>
            </div>{" "}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
