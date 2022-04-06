import CategoryIcon from "@mui/icons-material/Category";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LoginIcon from "@mui/icons-material/Login";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import placentic from "../Assets/logo/placentic.png";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav container">
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
              <NavLink className="nav__link" to="/blog">
                <LoginIcon />
                <span className="nav__text">Sign In</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav__menu2">
          <ul className="nav__list2">
            <li className="nav__item2">
              <NavLink className="nav__link2" to="/search">
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </NavLink>
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
