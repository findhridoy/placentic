import React from "react";
import product from "../assets/products/header-sofa-img.png";
import CustomButton from "./controls/CustomButton";

const Hero = () => {
  return (
    <section className="hero__section main__bg">
      <div className="container">
        <div className="hero__content">
          <div className="hero__data">
            <h1 className="hero__title">
              Fill your home <br /> with uniqueness
            </h1>
            <p className="hero__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              repellendus, mollitia itaque totam eos iste perferendis officiis,
              sed in enim laborum quam labore quibusdam non?
            </p>
            <CustomButton
              className="hero__btn btn btn__white"
              text="Discover"
            />
          </div>
          <div className="hero__image">
            <img src={product} alt="Products" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
