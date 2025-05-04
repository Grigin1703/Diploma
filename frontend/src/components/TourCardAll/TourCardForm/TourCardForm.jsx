import "./TourCardForm.scss";
import ButtonIcon from "@/assets/icons/arrow-white.svg";
import Button from "@/components/Button/Button";

import React, { useState, useRef, useEffect } from "react";
import { getAirportsByCity } from "@/api/tours.js";
import Swiper from "@/components/Swiper/Swiper";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import { format, addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function TourForm({ pricesByDuration, rooms, foods }) {
  const [touristsDropdown, setTouristsDropdown] = useState(false);
  const formTourists = useRef(null);
  const [tourists, setTourists] = useState(() => {
    return Number(localStorage.getItem("tourists")) || 1;
  });
  const [tempTourists, setTempTourists] = useState(tourists);

  const [roomDropdown, setRoomDropdown] = useState(false);
  const formRoom = useRef(null);
  const [selectedRoomType, setSelectedRoomType] = useState(() => {
    const room = localStorage.getItem("room");
    if (!room) return rooms[0].type;
    return room;
  });
  const [confirmedRoomType, setConfirmedRoomType] = useState(selectedRoomType);
  const handleSelectRoom = (type) => {
    setSelectedRoomType(type);
  };
  const applySelectedRoom = () => {
    setConfirmedRoomType(selectedRoomType);
    localStorage.setItem("room", selectedRoomType);
  };

  const [foodDropdown, setFoodDropdown] = useState(false);
  const formFood = useRef(null);
  const [selectedFoodType, setSelectedFoodType] = useState(() => {
    const food = localStorage.getItem("food");
    if (!food) return foods[0].type;
    return food;
  });
  const [confirmedFoodType, setConfirmedFoodType] = useState(selectedFoodType);
  const handleSelectFood = (type) => {
    setSelectedFoodType(type);
  };
  const applySelectedFood = () => {
    setConfirmedFoodType(selectedFoodType);
    localStorage.setItem("food", selectedFoodType);
  };

  const [departureDropdown, setDepartureDropdown] = useState(false);
  const formDeparture = useRef(null);

  const [departureDate, setDepartureDate] = useState(() => {
    const saved = localStorage.getItem("departureDate");
    return saved ? new Date(saved) : new Date();
  });
  const [tempDepartureDate, setTempDepartureDate] = useState(departureDate);
  const [stayDuration, setStayDuration] = useState(() => {
    const days = localStorage.getItem("days");
    if (!days) return 10;
    const cleaned = days.replace(/\D/g, "");
    return parseInt(cleaned, 10) || 10;
  });
  const [tempDuration, setTempDuration] = useState(stayDuration);
  const datePickerRef = useRef(false);

  const cityFrom = localStorage.getItem("departure") || "Москва";
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(() => {
    const airport = localStorage.getItem("airport");
    return airport ? parseInt(airport, 10) : "";
  });
  const [confirmedAirportType, setConfirmedAirportType] =
    useState(selectedAirport);

  const selectedFood = foods.find((food) => food.type === selectedFoodType);
  const selectedRoom = rooms.find((room) => room.type === selectedRoomType);
  const priceAirport = airports.find(
    (airport) => airport.id === selectedAirport
  );

  const total =
    (Number(pricesByDuration[stayDuration]) +
      selectedFood?.price +
      selectedRoom?.price +
      priceAirport?.price) *
    tempTourists;
  console.log((priceAirport?.price)),
  useEffect(() => {
    const fetchAirports = async () => {
      getAirportsByCity(cityFrom).then((data) => {
        setAirports(data);
        if (data.length === 1) {
          setSelectedAirport(data[0].id); // если один аэропорт, сразу выбрать его
        }
      });
    };

    fetchAirports();
  }, [cityFrom]);

  const applySelectedAirport = () => {
    setConfirmedAirportType(selectedAirport);
    localStorage.setItem("airport", selectedAirport);
  };

  const handleApplySelection = () => {
    setStayDuration(tempDuration);
    setDepartureDate(tempDepartureDate);
    datePickerRef.current.setOpen(false);
    localStorage.setItem("days", tempDuration);
    localStorage.setItem("departureDate", tempDepartureDate.toISOString());
  };

  const formatFullRange = (startDate, duration) => {
    if (!startDate || !duration) return "";
    const end = addDays(startDate, duration);
    const from = format(startDate, "d MMMM", { locale: ru });
    const to = format(end, "d MMMM yyyy", { locale: ru });
    return `${from} – ${to}`;
  };

  useEffect(() => {
    const hendleClickDropdown = (e) => {
      if (formTourists.current && !formTourists.current.contains(e.target)) {
        setTouristsDropdown(false);
      }

      if (formRoom.current && !formRoom.current.contains(e.target)) {
        setRoomDropdown(false);
      }

      if (formFood.current && !formFood.current.contains(e.target)) {
        setFoodDropdown(false);
      }

      if (formDeparture.current && !formDeparture.current.contains(e.target)) {
        setDepartureDropdown(false);
      }
    };
    document.addEventListener("click", hendleClickDropdown);
    return () => {
      document.removeEventListener("click", hendleClickDropdown);
    };
  });

  const incrementTourists = () => {
    setTempTourists((prev) => prev + 1);
  };
  const decrementTourists = () => {
    setTempTourists((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const applyTourists = () => {
    setTourists(tempTourists);
    localStorage.setItem("tourists", tempTourists);
  };

  const slide = (pricesByDuration) => {
    if (!pricesByDuration) return [];
    return Object.entries(pricesByDuration)
      .filter(([days]) => parseInt(days) != stayDuration)
      .map(([days, price]) => (
        <div
          key={days}
          className={`extra-content__item ${
            tempDuration === parseInt(days) ? "open" : ""
          }`}
        >
          <button type="button" onClick={() => setTempDuration(parseInt(days))}>
            <strong>{days} дней</strong> {price.toLocaleString("ru-Ru")} ₽ / за
            1
          </button>
        </div>
      ));
  };
  return (
    <div className="from__block">
      <div className="form__container">
        <div className="form__header">
          <h3 className="form__title">Твой отдых</h3>
          <div className="hero__price-block">
            <span>
              <strong>
                {pricesByDuration[stayDuration].toLocaleString("ru-RU")} ₽
              </strong>
              / за 1 человека
            </span>
          </div>
        </div>
        <form className="form">
          <div className="form__data form__block">
            <strong
              className="form__data-value"
              onClick={() => datePickerRef.current.setOpen(true)}
            >
              {formatFullRange(departureDate, stayDuration)}
            </strong>
            <DatePicker
              ref={datePickerRef}
              shouldCloseOnSelect={false}
              id="departure-data"
              selected={tempDepartureDate}
              onChange={(date) => setTempDepartureDate(date)}
              minDate={new Date()}
              monthsShown={1}
              locale={ru}
              dateFormat="dd.MM.yyyy"
              calendarContainer={({ children }) => (
                <div className="custom-calendar-container">
                  {children}
                  <div className="extra-content">
                    <div className="extra-content__top">
                      <Swiper
                        slides={slide(pricesByDuration)}
                        slidesPerView={2.2}
                        spaceBetween={10}
                        navigation={false}
                        scrollbar={false}
                      />
                    </div>
                    <div className="extra-content__bottom">
                      <span>
                        <strong>{total.toLocaleString("ru-Ru")}₽</strong>/ за{" "}
                        {tempTourists} человека
                      </span>
                      <Button
                        onClick={handleApplySelection}
                        type={true}
                        children={"выбрать"}
                        icon={ButtonIcon}
                        variant={"black"}
                      />
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
          <div className="form__tourists form__block" ref={formTourists}>
            <label onClick={() => setTouristsDropdown(!touristsDropdown)}>
              Туристы:
            </label>
            <span
              className="form__block-span"
              onClick={() => setTouristsDropdown(!touristsDropdown)}
            >
              {tourists}
            </span>
            <div
              className={`form__tourists-dropdown ${
                touristsDropdown ? "open" : ""
              }`}
            >
              {touristsDropdown && (
                <div className="form__tourists-content">
                  <div className="form__tourists-content-top">
                    <span>Количество</span>
                    <div className="form__tourists-block">
                      <button type="button" onClick={decrementTourists}>
                        —
                      </button>
                      <strong>{tempTourists}</strong>
                      <button type="button" onClick={incrementTourists}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="form__block-btn-block">
                    <Button
                      type={true}
                      children={"выбрать"}
                      icon={ButtonIcon}
                      variant={"black"}
                      onClick={applyTourists}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="form__room form__block" ref={formRoom}>
            <label onClick={() => setRoomDropdown(!roomDropdown)}>Номер:</label>
            <span
              className="form__block-span"
              onClick={() => setRoomDropdown(!roomDropdown)}
            >
              {confirmedRoomType}
            </span>

            <div
              className={`form__room-dropdown ${roomDropdown ? "open" : ""}`}
            >
              {roomDropdown && (
                <div className=" form__content">
                  <div className=" form__content-top">
                    <ul className=" form__content-list">
                      {rooms &&
                        rooms.map((room, i) => (
                          <li key={i}>
                            <div className=" form__list-input-block">
                              <input
                                type="radio"
                                name="roomType"
                                value={room.type}
                                checked={selectedRoomType === room.type}
                                onChange={() => handleSelectRoom(room.type)}
                              />
                              <span>{room.type}</span>
                            </div>
                            <span>
                              {selectedRoomType === room.type
                                ? "в цене"
                                : room.price}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="form__block-btn-block">
                    <Button
                      type={true}
                      children={"выбрать"}
                      icon={ButtonIcon}
                      variant={"black"}
                      onClick={applySelectedRoom}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="form__food form__block" ref={formFood}>
            <label onClick={() => setFoodDropdown(!foodDropdown)}>
              Питание:
            </label>
            <span
              className="form__block-span"
              onClick={() => setFoodDropdown(!foodDropdown)}
            >
              {confirmedFoodType}
            </span>

            <div
              className={`form__food-dropdown ${foodDropdown ? "open" : ""}`}
            >
              {foodDropdown && (
                <div className=" form__content">
                  <div className=" form__content-top">
                    <ul className=" form__content-list">
                      {foods &&
                        foods.map((food, i) => (
                          <li key={i}>
                            <div className=" form__list-input-block">
                              <input
                                type="radio"
                                name="foodType"
                                value={food.type}
                                checked={selectedFoodType === food.type}
                                onChange={() => handleSelectFood(food.type)}
                              />
                              <span>{food.type}</span>
                            </div>
                            <span>
                              {selectedFoodType === food.type
                                ? "в цене"
                                : food.price}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="form__block-btn-block">
                    <Button
                      type={true}
                      children={"выбрать"}
                      icon={ButtonIcon}
                      variant={"black"}
                      onClick={applySelectedFood}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="form__departure form__block" ref={formDeparture}>
            <label onClick={() => setDepartureDropdown(!departureDropdown)}>
              Вылет:
            </label>
            <span
              className="form__block-span"
              onClick={() => setDepartureDropdown(!departureDropdown)}
            >
              {airports.find((a) => a.id === confirmedAirportType)?.name ||
                "Выберите аэропорт"}
            </span>

            <div
              className={`form__departure-dropdown ${
                departureDropdown ? "open" : ""
              }`}
            >
              {departureDropdown && (
                <div className=" form__content">
                  <div className=" form__content-top">
                    <ul className=" form__content-list">
                      {airports &&
                        airports.map((airport, i) => (
                          <li key={i}>
                            <div className="form__list-input-block">
                              <input
                                type="radio"
                                name="airport"
                                checked={selectedAirport === airport.id}
                                onChange={() => setSelectedAirport(airport.id)}
                              />
                              <div className="form__list-span-block">
                                <span>{airport.name}</span>
                                <span>({airport.code})</span>
                              </div>
                            </div>
                            <span>
                              {selectedAirport === airport.id
                                ? "в цене"
                                : airport.price}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="form__block-btn-block">
                    <Button
                      type={true}
                      children={"выбрать"}
                      icon={ButtonIcon}
                      variant={"black"}
                      onClick={applySelectedAirport}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
        <div className="form__footer">
          <strong className="form__result">
            ИТОГ: {total.toLocaleString("ru-Ru")}₽
          </strong>
          <Button children={"оставить заявку"} icon={ButtonIcon} />
        </div>
      </div>
    </div>
  );
}
