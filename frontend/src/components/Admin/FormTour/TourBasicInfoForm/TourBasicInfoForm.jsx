import RatingImg from "@/assets/icons/star1.svg";
import { useState, useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function TourBasicInfoForm({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
}) {
  const [durationMaxOpen, setDurationMaxOpen] = useState(false);
  const durationMaxValue = [8, 10, 12, 15, 20];
  const durationMaxBlock = useRef(null);

  const [durationMinOpen, setDurationMinOpen] = useState(false);
  const durationMinValue = [6, 8, 10, 12, 15];
  const durationMinBlock = useRef(null);

  const [ratingOpen, setRatingOpen] = useState(false);
  const ratingValue = [1, 2, 3, 4, 5];
  const ratingBlock = useRef(null);

  useOutsideClick(durationMinBlock, () => {
    setDurationMinOpen(false);
  });

  useOutsideClick(durationMaxBlock, () => {
    setDurationMaxOpen(false);
  });

  useOutsideClick(ratingBlock, () => {
    setRatingOpen(false);
  });

  return (
    <section className="formTour__basic formTour__section" id="basic">
      <h1 className="formTour__title">Новый Тур</h1>
      <div className="container">
        <h2 className="formTour__section-title">Основные:</h2>
        <form onSubmit={handleSubmit} className="formTour__form">
          <div className="formTour__field">
            <label htmlFor="title">Заголовок:</label>
            <input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Title"
            />
          </div>
          <div className="formTour__field">
            <label htmlFor="sud_title">Второй Заголовок:</label>
            <input
              id="sud_title"
              value={formData.sub_title}
              onChange={(e) => handleChange("sub_title", e.target.value)}
              placeholder="Sub_title"
            />
          </div>
          <div className="formTour__field">
            <label htmlFor="season">Сезон:</label>
            <input
              id="season"
              value={formData.season}
              onChange={(e) => handleChange("season", e.target.value)}
              placeholder="season"
            />
          </div>
          <div className="formTour__field">
            <label>Рейтинг:</label>
            <div
              className={`formTour__dropdown ${ratingOpen ? "focus" : ""}`}
              onClick={() => setRatingOpen(!ratingOpen)}
              ref={ratingBlock}
            >
              <div className="formTour__dropdown-value">
                <span>{formData.rating}</span>
                <img src={RatingImg} alt="" />
              </div>
              <div
                className={`formTour__dropdown-list-wrapper ${
                  ratingOpen ? "open" : ""
                }`}
              >
                <ul className="formTour__dropdown-list">
                  {ratingValue.map((rating, key) => (
                    <li
                      key={key}
                      className={`formTour__dropdown-item ${
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
          <div className="formTour__field">
            <label>мин. Дней Пребывания:</label>
            <div
              className={`formTour__dropdown ${durationMinOpen ? "focus" : ""}`}
              onClick={() => setDurationMinOpen(!durationMinOpen)}
              ref={durationMinBlock}
            >
              <div className="formTour__dropdown-value">
                <span>{formData.duration_min} дней</span>
              </div>
              <div
                className={`formTour__dropdown-list-wrapper ${
                  durationMinOpen ? "open" : ""
                }`}
              >
                <ul className="formTour__dropdown-list">
                  {durationMinValue
                    .filter((days) =>
                      formData.duration_max
                        ? days < Number(formData.duration_max)
                        : true
                    )
                    .map((days, key) => (
                      <li
                        key={key}
                        className={`formTour__dropdown-item ${
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
          <div className="formTour__field">
            <label>макс. Дней Пребывания:</label>
            <div
              className={`formTour__dropdown ${durationMaxOpen ? "focus" : ""}`}
              onClick={() => setDurationMaxOpen(!durationMaxOpen)}
              ref={durationMaxBlock}
            >
              <div className="formTour__dropdown-value">
                <span>{formData.duration_max} дней</span>
              </div>
              <div
                className={`formTour__dropdown-list-wrapper ${
                  durationMaxOpen ? "open" : ""
                }`}
              >
                <ul className="formTour__dropdown-list">
                  {durationMaxValue
                    .filter((days) =>
                      formData.duration_min
                        ? days > Number(formData.duration_min)
                        : true
                    )
                    .map((days, key) => (
                      <li
                        key={key}
                        className={`formTour__dropdown-item ${
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
          <div className="formTour__field formTour__field-price">
            <div className="formTour__price-inputs">
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
          <button className="formTour__btn" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}
