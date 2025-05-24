import "./Main.scss";
import UserIcon from "@/assets/icons/user.svg";
import { useEffect } from "react";

export default function Main({
  tour,
  getAverageRating,
  setRoom,
  room,
  food,
  setFood,
  tourist,
}) {
  const handleRoomType = (type) => {
    setRoom(type); // обновляем состояние
  };

  const handleFoodType = (type) => {
    setFood(type); // обновляем состояние
  };

  return (
    <section className="main">
      <div className="container">
        <div className="main__content">
          <div className="main__advantages">
            <h2 className="main__subtitle">почему стоит выбрать этот отель</h2>
            <p className="main__advantages-desc">{tour.advantages}</p>
            <ul className="main__advantages-list">
              {tour.amenities.map((amenit, index) => (
                <li key={index}>{amenit}</li>
              ))}
            </ul>
          </div>
          <div className="main__numbers">
            <h2 className="main__subtitle">доступные номера</h2>
            <ul className="main__numbers-list">
              {tour.rooms &&
                tour.rooms.map((item, index) => (
                  <li key={index} className="main__numbers-item">
                    <article className="numbers__card">
                      <img
                        className="numbers__card-img"
                        src={item.images}
                        alt="Tour image"
                      />
                      <div className="numbers__card-content">
                        <div className="numbers__card-header">
                          <div className="numbers__card-header-left">
                            <h3 className="numbers__card-title">{item.type}</h3>
                            <div
                              className="numbers__card-tourists"
                              data-users={`${tourist} ${
                                tourist === 1 ? "человек" : "человека"
                              }`}
                            >
                              {Array.from({ length: tourist }, (_, index) => (
                                <img
                                  key={index}
                                  src={UserIcon}
                                  alt="UserIcon"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="numbers__card-header-right">
                            <button
                              className={`main__card-btn ${
                                item.type === room ? "active" : ""
                              }`}
                              data-status={
                                item.type === room
                                  ? "в цене"
                                  : `${
                                      item.price >
                                      (tour.rooms.find((r) => r.type === room)
                                        ?.price || 0)
                                        ? "+"
                                        : "-"
                                    }${Math.abs(
                                      item.price -
                                        (tour.rooms.find((r) => r.type === room)
                                          ?.price || 0)
                                    ).toLocaleString("ru-RU")}₽`
                              }
                              onClick={() => handleRoomType(item.type)}
                            >
                              {item.type === room ? "Выбрано" : "Выбрать"}
                            </button>
                          </div>
                        </div>
                        <ul className="numbers__card-list">
                          {item.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </li>
                ))}
            </ul>
          </div>
          <div className="main__rating">
            <h2
              className="main__subtitle rating__title"
              data-rating={getAverageRating(tour.rating_details)}
            >
              рейтинг отеля
            </h2>
            <ul className="main__rating-list">
              {tour.rating_details.map((item, index) => (
                <li key={index} data-rating={Number(item.rating).toFixed(1)}>
                  <span>{item.type}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="main__location">
            <h2 className="main__subtitle">Расположение отеля</h2>
            <div className="main__location-content">
              <div className="main__location-block">
                <strong>Окрестности</strong>
                <ul className="main__location-list">
                  {tour.location_neighborhood.map((e, key) => (
                    <li key={key}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="main__location-block">
                <strong>Коммуникация</strong>
                <ul className="main__location-list">
                  {tour.location_communication.map((e, key) => (
                    <li key={key}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="main__location-block">
                <strong>Расстояние от аэропорта</strong>
                <ul className="main__location-list">
                  {tour.distance_airport.map((e, key) => (
                    <li key={key}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="main__beaches">
            <h2 className="main__subtitle">пляжи</h2>
            <div className="main__beaches-content">
              <strong>Пляжи отеля</strong>
              <ul className="main__beaches-list">
                {tour.beaches.map((e, key) => (
                  <li key={key}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="main__aboutHotel">
            <h2 className="main__subtitle">Об отеле</h2>
            <div className="main__aboutHotel-content">
              <div className="main__aboutHotel-block">
                <strong>В общем</strong>
                <ul className="main__aboutHotel-list">
                  {tour.about_hotel.map((e, key) => (
                    <li key={key}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="main__aboutHotel-block">
                <strong>Спорт и развлечения</strong>
                <ul className="main__aboutHotel-list">
                  {tour.sports_entertainment.map((e, key) => (
                    <li key={key}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="main__aboutHotel-block">
                <strong>Бассейн</strong>
                <ul className="main__aboutHotel-list">
                  {tour.pool.map((e, key) => (
                    <li key={key}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="main__aboutHotel-block">
                <strong>спа</strong>
                <ul className="main__aboutHotel-list">
                  {tour.spa.map((e, key) => (
                    <li key={key}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="main__aboutHotel-block">
                <strong>Услуги</strong>
                <ul className="main__aboutHotel-list">
                  {tour.services.map((e, key) => (
                    <li key={key}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="main__aboutHotel-block">
                <strong>контакты</strong>
                <ul className="main__aboutHotel-list">
                  {tour.contacts.map((e, key) => (
                    <li key={key}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="main__forChildren">
            <h2 className="main__subtitle">Для детей</h2>
            <div className="main__forChildren-content">
              <strong>удобства</strong>
              <ul className="main__forChildren-list">
                {tour.for_children.map((e, key) => (
                  <li key={key}>{e}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="main__food">
            <h2 className="main__subtitle">Еда</h2>
            {tour.mealPlans &&
              tour.mealPlans.map((item, i) => (
                <div key={i} className="main__food-block">
                  <div className="main__food-header">
                    <strong>{item.type}</strong>
                    <button
                      className={`main__card-btn ${
                        item.type === food ? "active" : ""
                      }`}
                      data-status={
                        item.type === food
                          ? "в цене"
                          : `${
                              item.price >
                              (tour.mealPlans.find((r) => r.type === food)
                                ?.price || 0)
                                ? "+"
                                : "-"
                            }${Math.abs(
                              item.price -
                                (tour.mealPlans.find((r) => r.type === food)
                                  ?.price || 0)
                            ).toLocaleString("ru-RU")}₽`
                      }
                      onClick={() => handleFoodType(item.type)}
                    >
                      {item.type === food ? "Выбрано" : "Выбрать"}
                    </button>
                  </div>
                  <ul className="main__food-list">
                    {item.details.map((e, key) => (
                      <li key={key}>{e}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
