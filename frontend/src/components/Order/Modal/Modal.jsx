import "./Modal.scss";
import RatingImg from "@/assets/icons/star1.svg";
import OrderForm from "../Form/Form";
import { useEffect, useState, useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { getAirportsByCity } from "@/api/tours.js";
import { format, addDays } from "date-fns";
import { ru } from "date-fns/locale";

export default function OrderModal({ tour, isOpen, onClose }) {
  const modalBlock = useRef(null);
  const modalContent = useRef(null);
  const days = Number(localStorage.getItem("days"));
  const tourists = localStorage.getItem("tourists");
  const room = localStorage.getItem("room");
  const food = localStorage.getItem("food");
  const departureDate = localStorage.getItem("departureDate");
  const departure = localStorage.getItem("departure");
  const airportId = Number(localStorage.getItem("airport"));
  const [airport, setAirport] = useState("");

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getAirportsByCity(departure);
        const selected = data.find((a) => a.id === airportId);
        if (selected) {
          setAirport(selected.name);
        } else {
          setAirport("Не найден");
        }
      } catch (error) {
        console.error("Ошибка загрузки аэропортов:", error);
      }
    };

    if (airportId) {
      fetchAirports();
    }
  }, []);

  const formatFullRange = (startDate, duration) => {
    if (!startDate || !duration) return "";
    const end = addDays(startDate, duration);
    const from = format(startDate, "d MMMM", { locale: ru });
    const to = format(end, "d MMMM yyyy", { locale: ru });
    return `${from} – ${to}`;
  };

  useOutsideClick(modalContent, () => {
    onClose();
    document.body.style.overflow = "auto";
  });

  useEffect(() => {
    if (modalBlock.current) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="orderModal" ref={modalBlock}>
      <div className="orderModal__content" ref={modalContent}>
        <div className="container">
          <h2 className="orderModal__title">Оформление заказа</h2>
          <div className="orderModal__wrapper">
            <div className="orderModal__header">
              <OrderForm />
              <strong>
                ИТОГ: {tour.pricesByDuration[days].toLocaleString("ru-Ru")}₽
              </strong>
            </div>
            <div className="orderModal__info">
              <div className="orderModal__info-details">
                <span>
                  <strong>Тур:</strong>
                  <span className="dots"></span>
                  {tour.title}
                </span>
                <span>
                  <strong>Отель:</strong>
                  <span className="dots"></span>
                  {tour.sub_title} {tour.rating} <img src={RatingImg} alt="" />
                </span>
                <span>
                  <strong>Номер:</strong>
                  <span className="dots"></span>
                  {room}
                </span>
                <span>
                  <strong>Питание:</strong>
                  <span className="dots"></span>
                  {food}
                </span>
                <span>
                  <strong>Туристы:</strong>
                  <span className="dots"></span>
                  {tourists == 1
                    ? tourists + " человек"
                    : tourists + " человека"}
                </span>
                <span>
                  <strong>Дней:</strong>
                  <span className="dots"></span>
                  {days}
                </span>
                <span>
                  <strong>Вылет – Возврат:</strong>
                  <span className="dots"></span>
                  {formatFullRange(departureDate, days)}
                </span>
                <span>
                  <strong>Город вылета:</strong>
                  <span className="dots"></span>
                  {departure}
                </span>
                <span>
                  <strong>Аэропорт:</strong>
                  <span className="dots"></span>
                  {airport}
                </span>
              </div>
            </div>
          </div>
          <button className="orderModal__btn" onClick={() => onClose(false)}>
            Оформить
          </button>
        </div>
      </div>
    </div>
  );
}
