import { Button } from "@mui/material";
import React from "react";
import product from "../Assets/products/header-sofa-img.png";

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
            <div className="hero__btn btn btn__white">
              <Button>Discover</Button>
            </div>
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
