import "./ToursCard.scss";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import TourCardItem from "./TourCardItem";
import TourCardSkeleton from "./TourCardSkeleton";
import ToursPagination from "./ToursPagination";

export default function ToursCard({
  selectedSeasons,
  selectedFood,
  selectedRatings,
  selectedAmenities,
  strictAmenities,
  durationRange,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 4;

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
                  <TourCardSkeleton />
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
                  <TourCardItem tour={tour} />
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
        <ToursPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
