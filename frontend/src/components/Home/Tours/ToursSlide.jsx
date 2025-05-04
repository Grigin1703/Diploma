import WhiteLine from "../../../assets/icons/white-line.svg";

export default function ToursSlide(props) {
  return (
    <div
      className="swiper-slide"
      style={{
        backgroundImage: `url(${props.img})`,
      }}
    >
      <div className="tours__slide-content">
        <div className="tours__slide-top">
          <div className="tours__slide-days">
            <span>{props.days}</span>
          </div>
          <div className="tours__slide-price">
            <span>{props.price}</span>
          </div>
        </div>
        <div className="tours__slide-bottom">
          <div className="tours__slide-title-block">
            <strong>{props.country}</strong>
            <strong>{props.city}</strong>
          </div>
          <div className="tours__slide-data">
            <span>{props.date}</span>
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
