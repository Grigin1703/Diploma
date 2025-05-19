import "./Modal.scss";
import RatingImg from "@/assets/icons/star1.svg";
import OrderForm from "../Form/Form";
import { useEffect, useState, useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { getAirportsByCity } from "@/api/tours.js";
import { format, addDays } from "date-fns";
import { ru } from "date-fns/locale";

export default function OrderModal({ tour, isOpen, onClose }) {
  const modalRef = useRef(null);
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

  useOutsideClick(modalRef, () => {
    onClose();
  });

  if (!isOpen) return null;

  return (
    <div className="orderModal">
      <div className="orderModal__content" ref={modalRef}>
        <div className="container">
          <h2 className="orderModal__title">Оформление заказа</h2>
          <div className="orderModal__wrapper">
            <OrderForm />
            <div className="orderModal__info">
              <div className="orderModal__info-header">
                <span><strong>Тур:</strong>{tour.title}</span>
                <strong>{tour.pricesByDuration[days].toLocaleString("ru-Ru")}₽</strong>
              </div>
              <div className="orderModal__info-hotel">
                <span><strong>Отель:</strong>{tour.sub_title}</span>
                <span>
                  {tour.rating} <img src={RatingImg} alt="" />
                </span>
              </div>
              <div className="orderModal__info-details">
                <span><strong>Вылет – Возврат:</strong>{formatFullRange(departureDate, days)}</span>
                <span><strong>Дней:</strong>{days}</span>
                <span><strong>Город вылета:</strong>{departure}</span>
                <span><strong>Аэропорт:</strong>{airport}</span>
              </div>
              <div className="orderModal__info-conditions">
                <span><strong>Номер:</strong>{room}</span>
                <span><strong>Питание:</strong>{food}</span>
                <span><strong>Туристы:</strong>{tourists} человека</span>
              </div>
            </div>
          </div>
          <button className="orderModal__btn">Оформить</button>
        </div>
      </div>
    </div>
  );
}
