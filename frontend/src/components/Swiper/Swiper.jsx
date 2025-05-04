import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./Swiper.scss";

const Slider = ({
  slides,
  spaceBetween = 32,
  slidesPerView = 4,
  scrollbar = true,
  navigation = true,
  pagination = false,
  loop = true,
  speed = 500,
  swiperClass = "",
}) => {
  return (
    <div className={swiperClass}>
      <Swiper
        modules={[Navigation, Scrollbar, Pagination]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={navigation}
        pagination={pagination ? { type: "fraction" } : false}
        scrollbar={scrollbar ? { draggable: true } : false}
        loop={loop}
        speed={speed}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
