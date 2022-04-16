// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";

const DashboardHeader = ({ title }) => {
  const [showSearchBox, setShowSearchBox] = useState(false);

  return (
    <header className="dashboardHeader">
      <nav className="dh__nav">
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
                  <IconButton aria-label="cart">
                    <NotificationsIcon />
                  </IconButton>
                </li>
                <li className="nav__item">
                  <IconButton aria-label="avatar" size="small">
                    <Avatar
                      alt="Travis Howard"
                      src="https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg"
                      sx={{ width: 35, height: 35 }}
                    />
                  </IconButton>
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default DashboardHeader;
