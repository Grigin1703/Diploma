import "./TourBasicInfoForm.scss";
import RatingImg from "@/assets/icons/star1.svg";
import { useState } from "react";

export default function TourBasicInfoForm({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  ratingBlock,
  durationMinBlock,
  durationMaxBlock,
}) {
  const [durationMaxOpen, setDurationMaxOpen] = useState(false);
  const durationMaxValue = [8, 10, 12, 15, 20];

  const [durationMinOpen, setDurationMinOpen] = useState(false);
  const durationMinValue = [6, 8, 10, 12, 15];

  const [ratingOpen, setRatingOpen] = useState(false);
  const ratingValue = [1, 2, 3, 4, 5];

  return (
    <section className="editTour__basic editTour__section" id="basic">
      <h1 className="editTour__title">Редактировать {formData.sub_title}</h1>
      <div className="container">
        <h2 className="editTour__section-title">Основные:</h2>
        <form onSubmit={handleSubmit} className="editTour__form">
          <div className="editTour__field">
            <label htmlFor="title">Заголовок:</label>
            <input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Title"
            />
          </div>
          <div className="editTour__field">
            <label htmlFor="sud_title">Второй Заголовок:</label>
            <input
              id="sud_title"
              value={formData.sub_title}
              onChange={(e) => handleChange("sub_title", e.target.value)}
              placeholder="Sub_title"
            />
          </div>
          <div className="editTour__field">
            <label htmlFor="season">Сезон:</label>
            <input
              id="season"
              value={formData.season}
              onChange={(e) => handleChange("season", e.target.value)}
              placeholder="season"
            />
          </div>
          <div className="editTour__field">
            <label>Рейтинг:</label>
            <div
              className={`editTour__dropdown ${ratingOpen ? "focus" : ""}`}
              onClick={() => setRatingOpen(!ratingOpen)}
              ref={ratingBlock}
            >
              <div className="editTour__dropdown-value">
                <span>{formData.rating}</span>
                <img src={RatingImg} alt="" />
              </div>
              <div
                className={`editTour__dropdown-list-wrapper ${
                  ratingOpen ? "open" : ""
                }`}
              >
                <ul className="editTour__dropdown-list">
                  {ratingValue.map((rating, key) => (
                    <li
                      key={key}
                      className={`editTour__dropdown-item ${
                        formData.rating === rating ? "active" : ""
                      }`}
                      onClick={() => handleChange("rating", rating)}
                    >
                      <span>{rating}</span>
                      <img src={RatingImg} alt="" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <label>мин. Дней Пребывания:</label>
            <div
              className={`editTour__dropdown ${durationMinOpen ? "focus" : ""}`}
              onClick={() => setDurationMinOpen(!durationMinOpen)}
              ref={durationMinBlock}
            >
              <div className="editTour__dropdown-value">
                <span>{formData.duration_min} дней</span>
              </div>
              <div
                className={`editTour__dropdown-list-wrapper ${
                  durationMinOpen ? "open" : ""
                }`}
              >
                <ul className="editTour__dropdown-list">
                  {durationMinValue
                    .filter((days) => days < Number(formData.duration_max))
                    .map((days, key) => (
                      <li
                        key={key}
                        className={`editTour__dropdown-item ${
                          formData.duration_min === days ? "active" : ""
                        }`}
                        onClick={() => handleChange("duration_min", days)}
                      >
                        <span>{days} дней</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <label>макс. Дней Пребывания:</label>
            <div
              className={`editTour__dropdown ${durationMaxOpen ? "focus" : ""}`}
              onClick={() => setDurationMaxOpen(!durationMaxOpen)}
              ref={durationMaxBlock}
            >
              <div className="editTour__dropdown-value">
                <span>{formData.duration_max} дней</span>
              </div>
              <div
                className={`editTour__dropdown-list-wrapper ${
                  durationMaxOpen ? "open" : ""
                }`}
              >
                <ul className="editTour__dropdown-list">
                  {durationMaxValue
                    .filter((days) => days > Number(formData.duration_min))
                    .map((days, key) => (
                      <li
                        key={key}
                        className={`editTour__dropdown-item ${
                          formData.duration_max === days ? "active" : ""
                        }`}
                        onClick={() => handleChange("duration_max", days)}
                      >
                        <span>{days} дней</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="editTour__field editTour__block-price">
            <div className="editTour__price-inputs">
              {Object.entries(formData.pricesByDuration).map(
                ([days, price]) => (
                  <div key={days}>
                    <label htmlFor={days}>Цена за {days} дней</label>
                    <input
                      id={days}
                      type="number"
                      value={price}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pricesByDuration: {
                            ...prev.pricesByDuration,
                            [days]: Number(e.target.value),
                          },
                        }))
                      }
                      placeholder={`${days} дней`}
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <button className="editTour__btn" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}
