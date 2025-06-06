import Header from "@/components/layout/header/header";
import Hero from "@/components/common/Hero/Hero";
import Button from "@/components/ui/Button/Button";
import Spam2 from "@/components/common/Spam2/Spam2";
import Footer from "@/components/layout/Footer/Footer";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import Setting from "@/assets/icons/setting.svg";
import FilterSection from "@/components/pages/Tours/FilterSection";
import DurationSlider from "@/components/pages/Tours/DurationSlider";
import RatingFilter from "@/components/pages/Tours/RatingFilter";
import AmenitiesFilter from "@/components/pages/Tours/AmenitiesFilter";
import ToursCard from "@/components/pages/Tours/ToursCard/ToursCard";

import { HeroContent } from "@/data/data";
import { useState, useRef, useEffect } from "react";
import { getTours } from "@/api/tours.js";

import "../components/pages/Tours/Main.scss";

export default function Tours({ hot }) {
  const [seasons, setSeasons] = useState([]);
  // const [selectedSeasons, setSelectedSeasons] = useState(
  //   hot ? ["Горящие туры"] : []
  // );
  const [selectedSeasons, setSelectedSeasons] = useState();

  const [food, setFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);

  const [ratings, setRatings] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [strictAmenities, setStrictAmenities] = useState(false);

  const allowedDurations = [6, 8, 10, 12, 15, 20];
  const [durationRange, setDurationRange] = useState([6, 20]);

  const [filterBlockOpen, setFilterBlockOpen] = useState(false);
  const filterBlock = useRef(null);

  useOutsideClick(filterBlock, () => setFilterBlockOpen(false));

  const handleSeasonChange = (event) => {
    const { value, checked } = event.target;

    setSelectedSeasons((prevSeasons) => {
      if (checked) {
        return [...prevSeasons, value]; // Добавляем сезон, если чекбокс включен
      } else {
        return prevSeasons.filter((season) => season !== value); // Убираем сезон, если выключен
      }
    });
  };

  const handleRatingChange = (event) => {
    const value = Number(event.target.value); // Преобразуем в число!

    setSelectedRatings(
      (prevRatings) =>
        prevRatings.includes(value)
          ? prevRatings.filter((rating) => rating !== value) // Убираем, если уже есть
          : [...prevRatings, value] // Добавляем, если нет
    );
  };

  const handleFoodChange = (event) => {
    const { value, checked } = event.target;

    setSelectedFood((prevSeasons) => {
      if (checked) {
        return [...prevSeasons, value];
      } else {
        return prevSeasons.filter((food) => food !== value);
      }
    });
  };

  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;

    setSelectedAmenities((prevSeasons) => {
      if (checked) {
        return [...prevSeasons, value];
      } else {
        return prevSeasons.filter((amenity) => amenity !== value);
      }
    });
  };

  useEffect(() => {
    const fetchTours = async () => {
      const data = await getTours();
      // Извлекаем уникальные значения
      setSeasons([...new Set(data.map((tour) => tour.season))]);
      setRatings([...new Set(data.map((tour) => tour.rating))]);
      const allMealTypes = data.flatMap((tour) =>
        tour.mealPlans.map((plan) => plan.type)
      );
      setFood([...new Set(allMealTypes)]);
      setAmenities([...new Set(data.flatMap((tour) => tour.amenities))]);
    };

    fetchTours();
  }, []);
  useEffect(() => {
    setSelectedSeasons(hot ? ["Горящие туры"] : []);
  }, [hot]);
  
  return (
    <div className="tours">
      <Header />
      <main>
        <Hero
          search={HeroContent[hot ? 2 : 1].search}
          title={HeroContent[hot ? 2 : 1].title}
          imgBg={HeroContent[hot ? 2 : 1].imgBg}
          disc={HeroContent[hot ? 2 : 1].disc}
        />
        <section className="main">
          <div className={`main__filter ${filterBlockOpen ? "active" : ""}`}>
            <div
              className={`main__filter-content ${
                filterBlockOpen ? "active" : ""
              }`}
              ref={filterBlock}
            >
              <div className="main__filter-header">
                <h2 className="main__filter-title">Фильтры</h2>
                <button
                  className="main__filter-close"
                  onClick={() => setFilterBlockOpen(false)}
                >
                  <span></span>
                  <span></span>
                </button>
              </div>
              <FilterSection
                title={"предложение"}
                items={seasons}
                selected={selectedSeasons}
                onChange={handleSeasonChange}
              />
              <DurationSlider
                durationRange={durationRange}
                setDurationRange={setDurationRange}
                allowedDurations={allowedDurations}
              />
              <FilterSection
                title={"Питание"}
                items={food}
                selected={selectedFood}
                onChange={handleFoodChange}
              />
              <RatingFilter
                ratings={ratings}
                selected={selectedRatings}
                onChange={handleRatingChange}
              />
              <AmenitiesFilter
                amenities={amenities}
                selected={selectedAmenities}
                strict={strictAmenities}
                toggleStrict={setStrictAmenities}
                onChange={handleAmenityChange}
              />
            </div>
          </div>
          <div className="container">
            <div className="main__header">
              <h2 className="main__title">найденные варианты</h2>
              <Button
                icon={Setting}
                iconPosition={"left"}
                children={"Фильтры"}
                variant={"secondary"}
                onClick={() => setFilterBlockOpen(true)}
              />
            </div>

            <div className="tour-list">
              <ToursCard
                selectedSeasons={selectedSeasons}
                selectedFood={selectedFood}
                selectedRatings={selectedRatings}
                selectedAmenities={selectedAmenities}
                strictAmenities={strictAmenities}
                durationRange={durationRange}
              />
            </div>
          </div>
        </section>
        <Spam2 />
      </main>
      <Footer />
    </div>
  );
}
