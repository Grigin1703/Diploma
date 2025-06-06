import "./Modal.scss";
import RatingImg from "@/assets/icons/star1.svg";
import OrderForm from "../Form/Form";
import { useEffect, useState, useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useLocalStorageWithExpiry } from "@/utils/useLocalStorageWithExpiry";
import { getAirportsByCity } from "@/api/tours.js";
import { format, addDays } from "date-fns";
import { ru } from "date-fns/locale";

export default function OrderModal({
  tour,
  isOpen,
  onClose,
  days,
  food,
  room,
  tourist,
}) {
  const modalBlock = useRef(null);
  const modalContent = useRef(null);
  const formRef = useRef();
  const departureDate = useLocalStorageWithExpiry("departureDate", new Date());
  const departure = useLocalStorageWithExpiry("departure", "Москва");
  const airportId = useLocalStorageWithExpiry("airport", 1);
  const [airport, setAirport] = useState("");

  const handleClick = () => {
    formRef.current?.requestSubmit();
  };

  useEffect(() => {
    const fetchAirports = async () => {
      getAirportsByCity(departure[0]).then((data) => {
        setAirport(data);
        if (data.length === 1) {
          setAirport(data[0].id);
        }
      });
    };

    fetchAirports();
  }, []);

  const formatFullRange = (startDate, duration) => {
    if (!startDate || !duration) return "";
    const end = addDays(startDate, duration);
    const from = format(startDate, "d MMMM yyyy", { locale: ru });
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
              <OrderForm
                ref={formRef}
                onSuccess={() => alert("Заявка отправлена!")}
              />
              <strong>
                ИТОГ:{" "}
                {Number(localStorage.getItem("total")).toLocaleString("ru-Ru")}₽
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
                  {tourist == 1 ? tourist + " человек" : tourist + " человека"}
                </span>
                <span>
                  <strong>Дней:</strong>
                  <span className="dots"></span>
                  {days}
                </span>
                <span>
                  <strong>Вылет – Возврат:</strong>
                  <span className="dots"></span>
                  {formatFullRange(departureDate[0], days)}
                </span>
                <span>
                  <strong>Город вылета:</strong>
                  <span className="dots"></span>
                  {departure}
                </span>
                <span>
                  <strong>Аэропорт:</strong>
                  <span className="dots"></span>

                  {airport.find((a) => a.id === airportId[0])?.name}
                </span>
              </div>
            </div>
          </div>
          <button className="orderModal__btn" onClick={handleClick}>
            Оформить
          </button>
        </div>
      </div>
    </div>
  );
}
