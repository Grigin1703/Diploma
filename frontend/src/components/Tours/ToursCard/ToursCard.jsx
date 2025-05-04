import "./ToursCard.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Swiper from "@/components/Swiper/Swiper";
import Button from "@/components/Button/Button";
import Arrow from "@/assets/icons/arrow-white.svg";
import StarRating from "@/assets/icons/star1.svg";
import Calendar from "@/assets/icons/calendar.svg";
import Meals from "@/assets/icons/meals.svg";

const ToursCard = ({
  selectedSeasons,
  selectedFood,
  selectedRatings,
  selectedAmenities,
  strictAmenities,
  durationRange,
}) => {
  const [searchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 4;

  const navigate = useNavigate();
  const handlClick = (id) => {
    navigate(`/Tours/${id}`);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tours?${searchParams.toString()}`
        );
        setTours(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке туров:", error);
      }
    };

    fetchTours();
  }, [searchParams]);

  const filterTours = (tours) => {
    return tours.filter((tour) => {
      const seasonMatch =
        Array.isArray(selectedSeasons) && selectedSeasons.length > 0
          ? selectedSeasons.includes(tour.season)
          : true;

      const foodMatch =
        Array.isArray(selectedFood) && selectedFood.length > 0
          ? selectedFood.includes(tour.food)
          : true;

      const ratingMatch =
        Array.isArray(selectedRatings) && selectedRatings.length > 0
          ? selectedRatings.includes(tour.rating)
          : true;

      const amenityMatch =
        Array.isArray(selectedAmenities) && selectedAmenities.length > 0
          ? strictAmenities
            ? selectedAmenities.every((amenity) =>
                tour.amenities.includes(amenity)
              ) // Точное совпадение
            : tour.amenities.some((amenity) =>
                selectedAmenities.includes(amenity)
              ) // Хоть одно совпадение
          : true;

      const durationMatch =
        !durationRange.length ||
        (tour.duration_min <= durationRange[1] &&
          tour.duration_max >= durationRange[0]);

      return (
        seasonMatch && foodMatch && ratingMatch && amenityMatch && durationMatch
      );
    });
  };

  const filteredTours = filterTours(tours);

  const totalPages = Math.ceil(tours.length / limit);
  const currentTours = filteredTours.slice((page - 1) * limit, page * limit);

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

  return (
    <div>
      <ul className="toursCard__list">
        {currentTours.length > 0 ? (
          currentTours.map((tour) => (
            <li key={tour.id}>
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
                    <strong className="toursCard__subtitle">
                      {tour.sub_title}
                    </strong>
                    <div className="toursCard__rating_star">
                      {Array.from({ length: tour.rating }, (_, index) => (
                        <img key={index} src={StarRating} alt="Star" />
                      ))}
                    </div>
                    <div className="toursCard__rating_user">
                      <span>{tour.user_rating_total}</span>
                    </div>
                  </div>
                  <div className="toursCard__footer">
                    <div className="toursCard__footer-left">
                      <div>
                        <img src={Calendar} alt="" />
                        <span>
                          от {tour.duration_min} дней до {tour.duration_max}{" "}
                          дней
                        </span>
                      </div>
                      <div>
                        <img src={Meals} alt="" />
                        <span>{tour.food}</span>
                      </div>
                    </div>
                    <div className="toursCard__footer-right">
                      <ul>
                        {tour.amenities.map((amenity, index) => (
                          <li key={index}>
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
                      <strong>{tour.price}₽</strong> / за 1
                    </p>
                    <Button
                      children={"подробнее"}
                      icon={Arrow}
                      onClick={() => handlClick(tour.id)}
                    />
                  </div>
                </div>
              </article>
            </li>
          ))
        ) : (
          <p>Нет туров</p>
        )}
      </ul>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Назад
        </button>
        <span>
          {" "}
          {page} / {totalPages}{" "}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default ToursCard;
