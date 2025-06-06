import { useNavigate } from "react-router-dom";

import Swiper from "@/components/common/Swiper/Swiper";
import Button from "@/components/ui/Button/Button";
import Arrow from "@/assets/icons/arrow-white.svg";
import StarRating from "@/assets/icons/star1.svg";
import Calendar from "@/assets/icons/calendar.svg";
import Meals from "@/assets/icons/meals.svg";

export default function TourCardItem({ tour }) {
  const navigate = useNavigate();

  const slides = (images) => {
    if (images.length > 0) {
      return images.flatMap((img) =>
        img.image_url.map((img, i) => (
          <img key={i} src={img} alt={`Image ${i + 1}`} />
        ))
      );
    }
    return [];
  };

  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, item) => acc + item.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const handleClick = () => navigate(`/tours/${tour.id}`);
  return (
    <li>
      <article
        className={`toursCard ${
          tour.season === "Горящие туры" ? "toursCard_hot" : ""
        }`}
      >
        <div className="toursCard__swiper">
          <Swiper
            slides={slides(tour.imges)}
            slidesPerView={1}
            scrollbar={false}
            spaceBetween={0}
            swiperClass={"toursCardSwiper"}
          />
        </div>
        <div className="toursCard__center">
          <div className="toursCard__header">
            <h3 className="toursCard__title">{tour.title}</h3>
            <strong className="toursCard__subtitle">{tour.sub_title}</strong>
            <div className="toursCard__rating_star">
              {Array.from({ length: tour.rating }, (_, index) => (
                <img key={index} src={StarRating} alt="Star" />
              ))}
            </div>
            <div className="toursCard__rating_user">
              <span>{getAverageRating(tour.rating_details)}</span>
            </div>
          </div>
          <div className="toursCard__footer">
            <div className="toursCard__footer-left">
              <div>
                <img src={Calendar} alt="" />
                <span>
                  от {tour.duration_min} дней до {tour.duration_max} дней
                </span>
              </div>
              <div>
                <img src={Meals} alt="" />
                {tour.mealPlans.map((plan) => (
                  <span key={plan.type}>{plan.type}</span>
                ))}
              </div>
            </div>
            <div className="toursCard__footer-right">
              <ul>
                {tour.amenities.map((amenity) => (
                  <li key={amenity}>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="toursCard__right">
          <div className="toursCard__season">
            <span>{tour.season}</span>
          </div>
          <div className="toursCard__price">
            <p>
              <strong>
                {tour.pricesByDuration[6].toLocaleString("ru-Ru")}₽
              </strong>{" "}
              / за 1
            </p>
            <Button children={"подробнее"} icon={Arrow} onClick={handleClick} />
          </div>
        </div>
      </article>
    </li>
  );
}
