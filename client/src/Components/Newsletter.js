import React from "react";
import CustomButton from "./controls/CustomButton";

const Newsletter = () => {
  return (
    <section className="newsletter__section">
      <div className="container">
        <div className="newsletter__content">
          <div className="newsletter__data">
            <h2 className="newsletter__title">Join Our Newsletter</h2>
            <p className="newsletter__description">
              Subscribe today for free and save 10% on your first purchase.
            </p>
          </div>
          <div className="newsletter__input">
            <input type="text" placeholder="Your email" />
            <CustomButton
              className="newsletter__btn btn btn__dark"
              text="Subscribe"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
