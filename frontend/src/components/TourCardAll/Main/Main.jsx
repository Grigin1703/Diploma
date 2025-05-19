import "./Main.scss";
import UserIcon from "@/assets/icons/user.svg";



export default function Main({ tour }) {
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
              {console.log(tour)}
              {tour.rooms &&
                tour.rooms.map((room, index) => (
                  <li key={index} className="main__numbers-item">
                    <article className="numbers__card">
                      <img
                        className="numbers__card-img"
                        src={room.images}
                        alt="Tour image"
                      />
                      <div className="numbers__card-content">
                        <div className="numbers__card-header">
                          <div className="numbers__card-header-left">
                            <h3 className="numbers__card-title">{room.type}</h3>
                            <div
                              className="numbers__card-tourists"
                              data-users="2 человека"
                            >
                              <img src={UserIcon} alt="" />
                              <img src={UserIcon} alt="" />
                            </div>
                          </div>
                          <div className="numbers__card-header-right">
                            <button data-status="в цене">Выбрано</button>
                          </div>
                        </div>
                        <ul className="numbers__card-list">
                          {room.details.map((detail, i) => (
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
              data-rating={tour.user_rating_total}
            >
              рейтинг отеля
            </h2>
            <ul className="main__rating-list">
              {tour.rating_purity ? (
                <li data-rating={Number(tour.rating_purity).toFixed(1)}>
                  <span>Чистота</span>
                </li>
              ) : (
                <></>
              )}
              {tour.rating_infrastructure ? (
                <li data-rating={Number(tour.rating_infrastructure).toFixed(1)}>
                  <span>Инфраструктура</span>
                </li>
              ) : (
                <></>
              )}
              {tour.rating_location ? (
                <li data-rating={Number(tour.rating_location).toFixed(1)}>
                  <span>Локация</span>
                </li>
              ) : (
                <></>
              )}
              {tour.rating_convenience_rooms ? (
                <li
                  data-rating={Number(tour.rating_convenience_rooms).toFixed(1)}
                >
                  <span>Удобства номеров</span>
                </li>
              ) : (
                <></>
              )}
              {tour.rating_wifi ? (
                <li data-rating={Number(tour.rating_wifi).toFixed(1)}>
                  <span>Wi-Fi</span>
                </li>
              ) : (
                <></>
              )}
              {tour.rating_pool ? (
                <li data-rating={Number(tour.rating_pool).toFixed(1)}>
                  <span>Бассейн(ы)</span>
                </li>
              ) : (
                <></>
              )}
              {tour.rating_availability_transport ? (
                <li
                  data-rating={Number(
                    tour.rating_availability_transport
                  ).toFixed(1)}
                >
                  <span>Транспорт</span>
                </li>
              ) : (
                <></>
              )}
              {tour.rating_room_service ? (
                <li data-rating={Number(tour.rating_room_service).toFixed(1)}>
                  <span>Обслуживание</span>
                </li>
              ) : (
                <></>
              )}
              {tour.rating_childrens_zone ? (
                <li data-rating={Number(tour.rating_childrens_zone).toFixed(1)}>
                  <span>Детская зона</span>
                </li>
              ) : (
                <></>
              )}
              {tour.rating_entertainment_excursions ? (
                <li
                  data-rating={Number(
                    tour.rating_entertainment_excursions
                  ).toFixed(1)}
                >
                  <span>Экскурсии</span>
                </li>
              ) : (
                <></>
              )}
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
              tour.mealPlans.map((food, i) => (
                <div key={i} className="main__food-block">
                  <div className="main__food-header">
                    <strong>{food.type}</strong>
                    <button data-status={food.price}>Выбрано</button>
                  </div>
                  <ul className="main__food-list">
                    {food.details.map((e, key) => (
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
