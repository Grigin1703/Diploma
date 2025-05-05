import { nanoid } from "nanoid";

export default function TourAllInfoForm({
  handleSubmit,
  formData,
  handleArrayChange,
  handleAddArrayItem,
  handleDeleteArrayItem,
  handleArrayObjectChange,
  handleChange,
}) {

  return (
    <section className="editTour__all editTour__section" id="all">
      <div className="container">
        <h2 className="editTour__section-title">Общие:</h2>
        <form onSubmit={handleSubmit} className="editTour__form">
          <div className="editTour__field">
            <div className="editTour__all-advantages">
              <label htmlFor="advantages">Описание:</label>
              <div className="editTour__all-textarea">
                <textarea
                  id="advantages"
                  name="advantages"
                  value={formData.advantages}
                  onChange={(e) => handleChange("advantages", e.target.value)}
                  placeholder="Advantages"
                />
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.amenities.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`amenities-${index}`}>Удобство:</label>
                    <input
                      id={`amenities-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("amenities", index, e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteArrayItem("amenities", index)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() => handleAddArrayItem("amenities", "")}
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.beaches.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`beaches-${index}`}>Бассейн:</label>
                    <input
                      id={`beaches-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("beaches", index, e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteArrayItem("beaches", index)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() => handleAddArrayItem("beaches", "")}
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.sports_entertainment.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`sports_entertainment-${index}`}>
                      Спорт:
                    </label>
                    <input
                      id={`sports_entertainment-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(
                          "sports_entertainment",
                          index,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteArrayItem("sports_entertainment", index)
                    }
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() => handleAddArrayItem("sports_entertainment", "")}
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.services.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`services-${index}`}>Сервис:</label>
                    <input
                      id={`services-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("services", index, e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteArrayItem("services", index)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() => handleAddArrayItem("services", "")}
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.for_children.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`for_children-${index}`}>Для детей:</label>
                    <input
                      id={`for_children-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("for_children", index, e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteArrayItem("for_children", index)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() => handleAddArrayItem("for_children", "")}
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.contacts.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`contacts-${index}`}>Контакты:</label>
                    <input
                      id={`contacts-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("contacts", index, e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteArrayItem("contacts", index)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() => handleAddArrayItem("contacts", "")}
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.pool.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`pool-${index}`}>Басейн:</label>
                    <input
                      id={`pool-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("pool", index, e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteArrayItem("pool", index)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() => handleAddArrayItem("pool", "")}
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.location_neighborhood.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`location_neighborhood-${index}`}>
                      Рядом:
                    </label>
                    <input
                      id={`location_neighborhood-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(
                          "location_neighborhood",
                          index,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteArrayItem("location_neighborhood", index)
                    }
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() =>
                    handleAddArrayItem("location_neighborhood", "")
                  }
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.spa.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`spa-${index}`}>Спа:</label>
                    <input
                      id={`spa-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("spa", index, e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteArrayItem("spa", index)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() => handleAddArrayItem("spa", "")}
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.location_communication.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`location_communication-${index}`}>
                      Коммуникация:
                    </label>
                    <input
                      id={`location_communication-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(
                          "location_communication",
                          index,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteArrayItem("location_communication", index)
                    }
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() =>
                    handleAddArrayItem("location_communication", "")
                  }
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.distance_airport.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`distance_airport-${index}`}>
                      Аэропорт:
                    </label>
                    <input
                      id={`distance_airport-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(
                          "distance_airport",
                          index,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteArrayItem("distance_airport", index)
                    }
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() => handleAddArrayItem("distance_airport", "")}
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field">
            <div className="editTour__field-row">
              {formData.about_hotel.map((item, index) => (
                <div key={index} className="editTour__field-detail">
                  <div className="editTour__label-block">
                    <label htmlFor={`about_hotel-${index}`}>О отеле:</label>
                    <input
                      id={`about_hotel-${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("about_hotel", index, e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteArrayItem("about_hotel", index)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() => handleAddArrayItem("about_hotel", "")}
                >
                  Добавить деталь
                </button>
              </div>
            </div>
          </div>
          <div className="editTour__field editTour__field-all">
            <div className="editTour__field-row">
              {formData.rating_details.map((details, index) => (
                <div key={index}>
                  <div className="editTour__field-detail">
                    <div>
                      <label htmlFor={`rating-details-${index}`}>
                        Критерий:
                      </label>
                      <input
                        id={`rating-details-${index}`}
                        value={details.type}
                        onChange={(e) => {
                          handleArrayObjectChange(
                            "rating_details",
                            index,
                            "type",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor={`rating-number-${index}`}>Оценка:</label>
                      <input
                        id={`rating-number-${index}`}
                        type="number"
                        value={details.rating}
                        onChange={(e) =>
                          handleArrayObjectChange(
                            "rating_details",
                            index,
                            "rating",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteArrayItem("rating_details", index)
                      }
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
              <div className="editTour__field-btns">
                <button
                  type="button"
                  className="editTour__all-btn--add"
                  onClick={() =>
                    handleAddArrayItem("rating_details", {
                      type: "",
                      price: 0,
                    })
                  }
                >
                  Добавить
                </button>
              </div>
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
