import "swiper/css";
import "swiper/css/navigation";

import styled from "styled-components";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";

import prevArrow from "../../assets/images/left-arrow.png";
import nextArrow from "../../assets/images/right-arrow.png";
import sliderImage from "../../assets/images/slider-image.png";

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 300px;
  position: relative;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 100%;
  height: 100%;
`;

const SliderButton = styled.button<{ left?: string; right?: string }>`
  width: 30px;
  height: 30px;
  position: absolute;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const SliderButtonArrow = styled.img`
  width: 50%;
  height: 100%;
`;

const SliderItem = styled.img`
  width: 100%;
  height: 100%;
`;


const Slider = () => { //TODO - slider는 이런 식으로 만들었구만
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  SwiperCore.use([Navigation]);

  const swiperSettings = {
    slidesPerView: 1,
    onBeforeInit: (swiper: any) => {
      // 슬라이더 초기화 진행
      swiper.params.navigation.prevEl = prevButtonRef.current;
      swiper.params.navigation.nextEl = nextButtonRef.current;
      swiper.navigation.update();
    },
  };

  return (
    <StyledSwiper {...swiperSettings}>
      <SliderButton left="5px" ref={prevButtonRef}>
        <SliderButtonArrow src={prevArrow} />
      </SliderButton>
      <SliderButton right="5px" ref={nextButtonRef}>
        <SliderButtonArrow src={nextArrow} />
      </SliderButton>
      <StyledSwiperSlide>
        <SliderItem src={sliderImage} />
      </StyledSwiperSlide>
      <StyledSwiperSlide>
        <SliderItem src={sliderImage} />
      </StyledSwiperSlide>
    </StyledSwiper>
  );
};

export default Slider;
