import "./ToursCard.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Skeleton from "react-loading-skeleton";
import { motion, AnimatePresence } from "framer-motion";
import "react-loading-skeleton/dist/skeleton.css";

import Swiper from "@/components/Swiper/Swiper";
import Button from "@/components/Button/Button";
import Arrow from "@/assets/icons/arrow-white.svg";
import StarRating from "@/assets/icons/star1.svg";
import Calendar from "@/assets/icons/calendar.svg";
import Meals from "@/assets/icons/meals.svg";
import BtnNext from "@/assets/icons/swiper-next.svg";
import BtnPrev from "@/assets/icons/swiper-prev.svg";

const ToursCard = ({
  selectedSeasons,
  selectedFood,
  selectedRatings,
  selectedAmenities,
  strictAmenities,
  durationRange,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 4;

  const navigate = useNavigate();
  const handlClick = (id) => {
    navigate(`/tours/${id}`);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tours?${searchParams.toString()}`
        );
        const timeout = setTimeout(() => {
          setTours(response.data);
          setIsLoading(false);
        }, 300);
        return () => clearTimeout(timeout);
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
          ? tour.mealPlans.some((plan) => selectedFood.includes(plan.type))
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

  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, item) => acc + item.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const filteredTours = filterTours(tours);

  useEffect(() => {
    setPage(1);
  }, [
    searchParams,
    selectedSeasons,
    selectedFood,
    selectedRatings,
    selectedAmenities,
    strictAmenities,
    durationRange,
  ]);

  const totalPages = Math.ceil(filteredTours.length / limit);
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

  useEffect(() => {
    window.scrollTo({
      top: 600,
      behavior: "smooth",
    });
  }, [page]);

  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);

  return (
    <div className="toursCard__wrapper">
      <ul className="toursCard__list">
        <AnimatePresence mode="wait">
          {isLoading
            ? Array.from({ length: limit }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div key={index} className="toursCard">
                    <div className="toursCard__swiper">
                      <Skeleton height={200} />
                    </div>
                    <div className="toursCard__center">
                      <Skeleton
                        height={20}
                        width="60%"
                        style={{ marginBottom: 10 }}
                      />
                      <Skeleton height={15} width="40%" />
                      <div
                        style={{ display: "flex", gap: 8, margin: "10px 0" }}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Skeleton key={i} width={20} height={20} circle />
                        ))}
                      </div>
                      <Skeleton height={15} width="30%" />
                      <Skeleton
                        height={15}
                        width="70%"
                        style={{ marginTop: 10 }}
                      />
                    </div>
                    <div className="toursCard__right">
                      <Skeleton
                        height={20}
                        width="80%"
                        style={{ marginBottom: 10 }}
                      />
                      <Skeleton height={30} width="100px" />
                    </div>
                  </div>
                </motion.div>
              ))
            : currentTours.map((tour) => (
                <motion.div
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
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
                          <strong className="toursCard__subtitle">
                            {tour.sub_title}
                          </strong>
                          <div className="toursCard__rating_star">
                            {Array.from({ length: tour.rating }, (_, index) => (
                              <img key={index} src={StarRating} alt="Star" />
                            ))}
                          </div>
                          <div className="toursCard__rating_user">
                            <span>{getAverageRating(tour.rating_details)}</span>
                          </div>
                          {console.log(tour.rating_details)}
                        </div>
                        <div className="toursCard__footer">
                          <div className="toursCard__footer-left">
                            <div>
                              <img src={Calendar} alt="" />
                              <span>
                                от {tour.duration_min} дней до{" "}
                                {tour.duration_max} дней
                              </span>
                            </div>
                            <div>
                              <img src={Meals} alt="" />
                              {tour.mealPlans.map((plan) => (
                                <span>{plan.type}</span>
                              ))}
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
                            <strong>
                              {tour.pricesByDuration[6].toLocaleString("ru-Ru")}
                              ₽
                            </strong>{" "}
                            / за 1
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
                </motion.div>
              ))}
        </AnimatePresence>
        {!isLoading && currentTours.length === 0 && (
          <div className="tours__not-found">
            <p>Туры не найдены.</p>
          </div>
        )}
      </ul>
      {currentTours.length != 0 && (
        <div className="toursCard__btn-block">
          <button
            className={`toursCard__btn-swiper ${page === 1 ? "hidden" : ""}`}
            onClick={() => setPage(page - 1)}
          >
            <img src={BtnPrev} alt="" />
          </button>

          <div className="toursCard__page-block">
            <span>{page}</span> из {totalPages}
          </div>
          <button
            onClick={() => setPage(page + 1)}
            className={`toursCard__btn-swiper ${
              page === totalPages ? "hidden" : ""
            }`}
          >
            <img src={BtnNext} alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ToursCard;
