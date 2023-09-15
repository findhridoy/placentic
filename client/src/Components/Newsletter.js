import EastIcon from "@mui/icons-material/East";
import { IconButton } from "@mui/material";
import React from "react";

const Newsletter = () => {
  // email submit functionality
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="newsletter__section">
      <div className="container">
        <div className="newsletter__content">
          <div className="newsletter__data">
            <h2 className="newsletter__title">Join Our Newsletter</h2>
            <p className="newsletter__description">
              Enjoy out newsletter to stay updated with the latest news!
            </p>
            <form onSubmit={handleSubmit}>
              <div className="newsletter__form">
                <input type="text" placeholder="Your email" />
                <IconButton type="submit">
                  <EastIcon />
                </IconButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
