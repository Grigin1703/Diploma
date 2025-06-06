import "./TourCardForm.scss";
import ButtonIcon from "@/assets/icons/arrow-white.svg";
import Button from "@/components/ui/Button/Button";

import { useState, useRef, useEffect } from "react";
import { useLocalStorageWithExpiry } from "@/utils/useLocalStorageWithExpiry";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import { getAirportsByCity } from "@/api/tours.js";
import Swiper from "@/components/common/Swiper/Swiper";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import { format, addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function TourForm({
  pricesByDuration,
  rooms,
  foods,
  openModal,
  room,
  setRoom,
  food,
  setFood,
  days,
  setDays,
  tourist,
  setTourist,
}) {
  const [touristsDropdown, setTouristsDropdown] = useState(false);
  const formTourists = useRef(null);
  const [tourists, setTourists] = useState(tourist);
  const [tempTourists, setTempTourists] = useState(tourists);

  const [roomDropdown, setRoomDropdown] = useState(false);
  const formRoom = useRef(null);
  const [selectedRoomType, setSelectedRoomType] = useState(room);

  useEffect(() => {
    setSelectedRoomType(room);
    setConfirmedRoomType(room);
  }, [room, rooms]);

  const [confirmedRoomType, setConfirmedRoomType] = useState(selectedRoomType);
  const handleSelectRoom = (type) => {
    setSelectedRoomType(type);
  };
  const applySelectedRoom = () => {
    setConfirmedRoomType(selectedRoomType);
    setRoom(selectedRoomType);
  };

  const [foodDropdown, setFoodDropdown] = useState(false);
  const formFood = useRef(null);
  const [selectedFoodType, setSelectedFoodType] = useState(food);

  useEffect(() => {
    setSelectedFoodType(food);
    setConfirmedFoodType(food);
  }, [food, foods]);

  const availableFoodTypes = foods.map((food) => food.type);
  const availableRoomTypes = rooms.map((room) => room.type);
  const [confirmedFoodType, setConfirmedFoodType] = useState(selectedFoodType);
  const handleSelectFood = (type) => {
    setSelectedFoodType(type);
  };
  const applySelectedFood = () => {
    setConfirmedFoodType(selectedFoodType);
    setFood(selectedFoodType);
  };

  const [departureDropdown, setDepartureDropdown] = useState(false);
  const formDeparture = useRef(null);

  const [departureDate, setDepartureDate] = useLocalStorageWithExpiry(
    "departureDate",
    new Date()
  );
  const [tempDepartureDate, setTempDepartureDate] = useState(departureDate);

  const [stayDuration, setStayDuration] = useState(days);
  const [tempDuration, setTempDuration] = useState(stayDuration);
  const datePickerRef = useRef(false);

  useEffect(() => {
    setStayDuration(days);
    setTempDuration(days);
  }, [days]);

  const [departureCity] = useLocalStorageWithExpiry("departure", "Москва");
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useLocalStorageWithExpiry(
    "airport",
    1
  );

  const [confirmedAirportType, setConfirmedAirportType] =
    useState(selectedAirport);

  const selectedFood = foods.find((food) => food.type === selectedFoodType);
  const selectedRoom = rooms.find((room) => room.type === selectedRoomType);
  const priceAirport = airports.find(
    (airport) => airport.id === selectedAirport
  );

  const total =
    Number(pricesByDuration[stayDuration]) +
    Number(selectedFood?.price) +
    Number(selectedRoom?.price) +
    Number(priceAirport?.price);

  const totalAll = total * tourists;

  useEffect(() => {
    localStorage.setItem("total", totalAll)
  }, [totalAll]);

  useEffect(() => {
    const fetchAirports = async () => {
      getAirportsByCity(departureCity).then((data) => {
        setAirports(data);
        if (data.length === 1) {
          setSelectedAirport(data[0].id); // если один аэропорт, сразу выбрать его
        }
      });
    };

    fetchAirports();
  }, [departureCity]);

  const applySelectedAirport = () => {
    setConfirmedAirportType(selectedAirport);
  };

  const handleApplySelection = () => {
    setStayDuration(tempDuration);
    setDepartureDate(tempDepartureDate);
    setDays(tempDuration);
    datePickerRef.current.setOpen(false);
  };

  const formatFullRange = (startDate, duration) => {
    if (!startDate || !duration) return "";
    const end = addDays(startDate, duration);
    const from = format(startDate, "d MMMM", { locale: ru });
    const to = format(end, "d MMMM yyyy", { locale: ru });
    return `${from} – ${to}`;
  };

  useOutsideClick(formTourists, () => setTouristsDropdown(false));
  useOutsideClick(formRoom, () => setRoomDropdown(false));
  useOutsideClick(formFood, () => setFoodDropdown(false));
  useOutsideClick(formDeparture, () => setDepartureDropdown(false));

  const incrementTourists = () => {
    setTempTourists((prev) => (prev == 1 ? prev + 1 : 2));
  };
  const decrementTourists = () => {
    setTempTourists((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const applyTourists = () => {
    setTourists(tempTourists);
    setTourist(tempTourists);
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
    <div className="form">
      <div className="form__container">
        <div className="form__header">
          <h3 className="form__title">Твой отдых</h3>
          <div className="hero__price-block">
            <span>
              <strong>{total ? total.toLocaleString("ru-Ru") : ""} ₽</strong>/
              за 1 человека
            </span>
          </div>
        </div>
        <form className="form__form">
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
              placeholderText="Выбирете дату"
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
                        <strong>{totalAll.toLocaleString("ru-Ru")}₽</strong>/ за{" "}
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
              {availableRoomTypes.includes(confirmedRoomType)
                ? confirmedRoomType
                : "Выберите тип номера"}
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
                                : `${
                                    room.price >
                                    (rooms.find(
                                      (r) => r.type === selectedRoomType
                                    )?.price || 0)
                                      ? "+ "
                                      : "- "
                                  }${Math.abs(
                                    room.price -
                                      (rooms.find(
                                        (r) => r.type === selectedRoomType
                                      )?.price || 0)
                                  ).toLocaleString("ru-RU")}₽`}
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
              {availableFoodTypes.includes(confirmedFoodType)
                ? confirmedFoodType
                : "Выберите тип питания"}
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
                                : `${
                                    food.price >
                                    (foods.find(
                                      (r) => r.type === selectedFoodType
                                    )?.price || 0)
                                      ? "+ "
                                      : "- "
                                  }${Math.abs(
                                    food.price -
                                      (foods.find(
                                        (r) => r.type === selectedFoodType
                                      )?.price || 0)
                                  ).toLocaleString("ru-RU")}₽`}
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
              <strong>{departureCity},</strong>{" "}
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
                                : `${
                                    airport.price >
                                    (airports.find(
                                      (r) => r.id === selectedAirport
                                    )?.price || 0)
                                      ? "+ "
                                      : "- "
                                  }${Math.abs(
                                    airport.price -
                                      (airports.find(
                                        (r) => r.id === selectedAirport
                                      )?.price || 0)
                                  ).toLocaleString("ru-RU")}₽`}
                            </span>
                            {console.log(selectedAirport)}
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
            ИТОГ: {totalAll ? `${totalAll.toLocaleString("ru-Ru")}₽` : ""}
          </strong>
          <Button
            children={"оставить заявку"}
            icon={ButtonIcon}
            onClick={openModal}
          />
        </div>
      </div>
    </div>
  );
}
