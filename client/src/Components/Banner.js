import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import slider2 from "../assets/slider/chair-slider.jpg";
import slider3 from "../assets/slider/plant-slider.jpg";
import slider1 from "../assets/slider/sofa-slider.jpg";
import CustomButton from "./controls/CustomButton";

const SliderContent = ({ countnumber }) => {
  return (
    <div className="container">
      <div className="bannerSlider__content">
        <div className="bannerSlider__category">
          <div className="category__line"></div>
          <h4 className="category__name">
            Sofa
            <br /> Collection
          </h4>
        </div>

        <h1 className="bannerSlider__title">Wood cloth sofa</h1>
        <span className="bannerSlider__description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum fuga
          illum quas adipisci molestias! Excepturi exercitationem laboriosam
          nesciunt!
        </span>

        <CustomButton
          className="bannerSlider__button btn outline__dark"
          text="Explore now"
          endIcon={<PlayArrowIcon />}
        />

        <div className="bannerSlider__countnumber">0{countnumber}</div>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <section className="banner__slider">
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide style={{ backgroundImage: `url(${slider1})` }}>
          <SliderContent countnumber={1} />
        </SwiperSlide>

        <SwiperSlide style={{ backgroundImage: `url(${slider2})` }}>
          <SliderContent countnumber={2} />
        </SwiperSlide>

        <SwiperSlide style={{ backgroundImage: `url(${slider3})` }}>
          <SliderContent countnumber={3} />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
