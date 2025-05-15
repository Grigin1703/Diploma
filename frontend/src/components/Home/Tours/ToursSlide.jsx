import WhiteLine from "../../../assets/icons/white-line.svg";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ToursSlide({
  days,
  price,
  country,
  city,
  img,
  id,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className="swiper-slide" style={{ backgroundColor: "#00000040" }}>
        <div className="tours__slide-content">
          <div className="tours__slide-top">
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
          </div>
          <div className="tours__slide-bottom">
            <div className="tours__slide-title-block">
              <Skeleton width={100} height={20} />
              <Skeleton width={100} height={20} />
            </div>
            <div className="tours__slide-desc">
              <span>узнать подробнее</span>
              <img src={WhiteLine} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/tours/${id}`}>
      <div
        className="swiper-slide"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        <div className="tours__slide-content">
          <div className="tours__slide-top">
            <div className="tours__slide-days">
              <span>{days}</span>
            </div>
            <div className="tours__slide-price">
              <span>{price}</span>
            </div>
          </div>
          <div className="tours__slide-bottom">
            <div className="tours__slide-title-block">
              <strong>{country}</strong>
              <strong>{city}</strong>
            </div>
            <div className="tours__slide-desc">
              <span>узнать подробнее</span>
              <img src={WhiteLine} alt="" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
