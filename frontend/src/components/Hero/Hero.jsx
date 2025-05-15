import "./Hero.scss";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { RussianCities } from "@/data/dataCity";
import { Countries, TopCountries } from "@/data/dataCountries";
import { Days } from "@/data/dataDays";

import Button from "@/components/Button/Button";
import ButtonIcon from "@/assets/icons/arrow-white.svg";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

export default function Hero({ imgBg, title, disc, search }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [departureSelect, setDepartureSelect] = useState(() => {
    return localStorage.getItem("departure") || RussianCities[0];
  });
  const [departureOpen, setDepartureOpen] = useState(false);
  const departureRef = useRef(null);

  const [countriesSelect, setCountriesSelect] = useState(() => {
    return localStorage.getItem("countries") || "|";
  });
  const [countriesOpen, setCountriesOpen] = useState(false);
  const countriesRef = useRef(null);

  const [daysSelect, setDaysSelect] = useState(() => {
    return localStorage.getItem("days") || Days[0];
  });
  const [daysOpen, setDaysOpen] = useState(false);
  const daysRef = useRef(null);

  const [departureDate, setDepartureDate] = useState(() => {
    const sevData = localStorage.getItem("departureDate");
    return sevData ? new Date(sevData) : null;
  });

  const [tourists, setTourists] = useState(() => {
    return Number(localStorage.getItem("tourists")) || 1;
  });
  const [touristsOpen, setTouristsOpen] = useState(false);
  const touristsRef = useRef(null);

  const incrementTourists = () => setTourists((prev) => prev + 1);
  const decrementTourists = () =>
    setTourists((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    localStorage.setItem("departure", departureSelect);
    localStorage.setItem("countries", countriesSelect);
    localStorage.setItem(
      "departureDate",
      departureDate ? departureDate.toISOString() : ""
    );
    localStorage.setItem("days", daysSelect);
    localStorage.setItem("tourists", tourists);
  }, [departureSelect, countriesSelect, departureDate, daysSelect, tourists]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (departureRef.current && !departureRef.current.contains(e.target)) {
        setDepartureOpen(false);
      }
      if (countriesRef.current && !countriesRef.current.contains(e.target)) {
        setCountriesOpen(false);
      }
      if (daysRef.current && !daysRef.current.contains(e.target)) {
        setDaysOpen(false);
      }
      if (touristsRef.current && !touristsRef.current.contains(e.target)) {
        setTouristsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (countriesSelect) params.append("country", countriesSelect);
    if (daysSelect) {
      const days = daysSelect.split(" ")[0];
      params.append("duration", days);
    }

    try {
      const newPath =
        location.pathname === "/HotTours" ? "/HotTours" : "/Tours";

      navigate(`${newPath}?${params.toString()}`);
    } catch (error) {
      console.error("Ошибка при получении туров:", error);
    }
  };

  return (
    <section className="hero" style={{ backgroundImage: `url(${imgBg})` }}>
      <div className="container hero__container">
        <h1 className="hero__title">{title}</h1>
        {disc && <span className="hero__subtitle">{disc}</span>}

        <div className={`search ${search ? "" : "none"}`}>
          <div className="search__departure">
            <label>Откуда</label>
            <div className="departure__select" ref={departureRef}>
              <button
                className="select"
                onClick={() => setDepartureOpen(!departureOpen)}
              >
                {departureSelect}
              </button>
              <div
                className={`select__visibility ${departureOpen ? "open" : ""}`}
              >
                {departureOpen && (
                  <div className="select__menu-block">
                    <strong className="select__title">Выберите город</strong>
                    <ul className="select__menu">
                      {RussianCities.map((city) => (
                        <li
                          className="select__item"
                          key={city}
                          onClick={() => {
                            setDepartureSelect(city);
                            setDepartureOpen(false);
                          }}
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="search__countries">
            <label>Куда</label>
            <div className="countries__select" ref={countriesRef}>
              <button
                className="select"
                onClick={() => setCountriesOpen(!countriesOpen)}
              >
                {countriesSelect}
              </button>
              <div
                className={`select__visibility ${countriesOpen ? "open" : ""}`}
              >
                {countriesOpen && (
                  <div className="select__menu-block">
                    <div className="select__menu-left">
                      <strong className="select__title">Популярные</strong>
                      <ul className="select__menu">
                        {Object.entries(TopCountries).map(([key, country]) => (
                          <li
                            className="select__item"
                            key={key}
                            onClick={() => {
                              setCountriesSelect(country.name);
                              setCountriesOpen(false);
                            }}
                          >
                            {country.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="select__menu-right">
                      <strong className="select__title">Все страны</strong>
                      <ul className="select__menu">
                        {Object.entries(Countries).map(([key, country]) => (
                          <li
                            className="select__item"
                            key={key}
                            onClick={() => {
                              setCountriesSelect(country.name);
                              setCountriesOpen(false);
                            }}
                          >
                            {country.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="search__departure-data">
            <label htmlFor="departure-data">Вылет</label>
            <DatePicker
              id="departure-data"
              selected={departureDate}
              onChange={(data) => setDepartureDate(data)}
              dateFormat="dd.MM.yy"
              minDate={new Date()}
              placeholderText="|"
              monthsShown={2}
              locale={ru}
            />
          </div>
          <div className="search__days">
            <label>На сколько</label>
            <div className="days__select" ref={daysRef}>
              <button className="select" onClick={() => setDaysOpen(!daysOpen)}>
                {daysSelect} дней
              </button>
              <div className={`select__visibility ${daysOpen ? "open" : ""}`}>
                {daysOpen && (
                  <div className="select__menu-block">
                    <ul className="select__menu">
                      {Days.map((day) => (
                        <li
                          className="select__item"
                          key={day}
                          onClick={() => {
                            setDaysOpen(false);
                            setDaysSelect(day);
                          }}
                        >
                          {day} дней
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="search__tourists">
            <div className="tourists__content" ref={touristsRef}>
              <div
                className="tourists__content-top"
                onClick={() => setTouristsOpen(!touristsOpen)}
              >
                <label>Туристов</label>
                <span>{tourists}</span>
              </div>
              <div
                className={`select__visibility ${touristsOpen ? "open" : ""}`}
              >
                {touristsOpen && (
                  <div className="tourists__content-bottom">
                    <div className="tourists__counter">
                      <button onClick={decrementTourists}>—</button>
                      <span>{tourists}</span>
                      <button onClick={incrementTourists}>+</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="search__btn">
            <Button
              onClick={handleSearch}
              children={"подобрать"}
              icon={ButtonIcon}
            />
          </div>
        </div>
      </div>
      <div className="hero__opacity"></div>
    </section>
  );
}
