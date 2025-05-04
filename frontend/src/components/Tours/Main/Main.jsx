import "./Main.scss";
import { useState, useRef, useEffect } from "react";
import { getTours } from "@/api/tours.js";

import Button from "@/components/Button/Button";
import Setting from "@/assets/icons/setting.svg";
import ReactSlider from "react-slider";
import ToursCard from "../ToursCard/ToursCard";
import StarRating from "@/assets/icons/star1.svg";

export default function Main() {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]);

  const [food, setFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);

  const [ratings, setRatings] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [strictAmenities, setStrictAmenities] = useState(false);

  const allowedDurations = [6, 8, 10, 12, 15, 20];
  const [durationRange, setDurationRange] = useState([6, 20]);

  const filterBlock = useRef(null);
  const filterBlockFon = useRef(null);

  const removeFilterBlock = () => {
    if (filterBlock.current) {
      filterBlock.current.classList.remove("active");
      filterBlockFon.current.classList.remove("active");
    }
  };
  const addFilterBlock = () => {
    if (filterBlock.current) {
      filterBlock.current.classList.add("active");
      filterBlockFon.current.classList.add("active");
    }
  };
  const handleOutsideClick = (e) => {
    if (filterBlock.current && !filterBlock.current.contains(e.target)) {
      removeFilterBlock();
    }
  };

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

  // Добавляем обработчик кликов вне фильтра
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      const data = await getTours();
      // Извлекаем уникальные значения
      setSeasons([...new Set(data.map((tour) => tour.season))]);
      setRatings([...new Set(data.map((tour) => tour.rating))]);
      setFood([...new Set(data.map((tour) => tour.food))]);
      setAmenities([...new Set(data.flatMap((tour) => tour.amenities))]);
    };

    fetchTours();
  }, []);

  return (
    <section className="main">
      <div className="main__filter" ref={filterBlock}>
        <div className="main__filter-header">
          <h2 className="main__filter-title">Фильтры</h2>
          <button className="main__filter-close" onClick={removeFilterBlock}>
            <span></span>
            <span></span>
          </button>
        </div>
        {/* Фильтр по сезону */}
        <div className="main__block-filter">
          <h3>предложение</h3>
          {seasons.map((season) => (
            <label key={season}>
              <input
                type="checkbox"
                value={season}
                checked={selectedSeasons.includes(season)}
                onChange={handleSeasonChange}
              />
              <span>{season}</span>
            </label>
          ))}
        </div>

        {/* Фильтр по продолжительности (ползунок с двумя точками) */}
        <div className="main__block-filter">
          <h3>продолжительность пребывания</h3>
          <ReactSlider
            className="range-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            min={0}
            max={allowedDurations.length - 1}
            value={durationRange.map((value) =>
              allowedDurations.indexOf(value)
            )}
            onChange={(indexes) =>
              setDurationRange(indexes.map((index) => allowedDurations[index]))
            }
            minDistance={1}
          />
          <p>
            От <span>{durationRange[0]}</span> до
            <span>{durationRange[1]}</span> ночей
          </p>
        </div>

        {/* Фильтр по питанию */}
        <div className="main__block-filter">
          <h3>Питание</h3>
          {food.map((meal) => (
            <label key={meal}>
              <input
                type="checkbox"
                value={meal}
                checked={selectedFood.includes(meal)}
                onChange={handleFoodChange}
              />
              <span>{meal}</span>
            </label>
          ))}
        </div>

        {/* Фильтр по рейтингу */}
        <div className="main__block-filter">
          <h3>Рейтинг отеля</h3>
          {ratings.map((rating) => (
            <label key={rating}>
              <input
                type="checkbox"
                value={rating}
                checked={selectedRatings.includes(Number(rating))}
                onChange={handleRatingChange}
              />
              <span>
                {rating} <img src={StarRating} alt="" />
              </span>
            </label>
          ))}
        </div>

        <div className="main__block-filter">
          <h3>Удобства</h3>
          <button onClick={() => setStrictAmenities((prev) => !prev)}>
            {strictAmenities ? "Все удобства" : "Любое удобство"}
          </button>
          {amenities.map((amenity) => (
            <label key={amenity}>
              <input
                type="checkbox"
                value={amenity}
                checked={selectedAmenities.includes(amenity)}
                onChange={handleAmenityChange}
              />
              <span>{amenity}</span>
            </label>
          ))}
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
            onClick={addFilterBlock}
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
      <div className="ret" ref={filterBlockFon}></div>
    </section>
  );
}
