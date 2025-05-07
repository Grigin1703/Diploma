import { useState, useRef, useEffect } from "react";

export default function TourRoomInfoForm({
  formData,
  handleSubmit,
  handleArrayObjectChange,
  handleArrayInArrayChange,
  handleDeleteNested,
  handleAddNestedArrayItem,
  handleDeleteArrayItem,
  handleAddArrayItem,
}) {
  const [openRoomIndex, setOpenRoomIndex] = useState(null);
  const RoomValue = ["Comfort room", "Premium suite", "King suite"];
  const roomRefs = useRef([]);
  const toggleRoomOpen = (index) => {
    setOpenRoomIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      roomRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target)) {
          setOpenRoomIndex((prev) => (prev === index ? null : prev));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="formTour__room formTour__section" id="room">
      <div className="container">
        <h2 className="formTour__section-title">Номера:</h2>
        <form onSubmit={handleSubmit} className="formTour__form">
          <div className="formTour__field">
            <div className="formTour__field-inputs">
              {formData.rooms.map((room, index) => (
                <div key={index} className="formTour__field-row">
                  <div className="formTour__food-label-block">
                    <label>Тип:</label>
                    <div
                      className={`formTour__dropdown ${
                        openRoomIndex === index ? "focus" : ""
                      }`}
                      onClick={() => toggleRoomOpen(index)}
                      ref={(el) => (roomRefs.current[index] = el)}
                    >
                      <div className="formTour__dropdown-value">
                        <span>
                          {room.type === "" ? "Указать тип номера" : room.type}
                        </span>
                      </div>
                      <div
                        className={`formTour__dropdown-list-wrapper ${
                          openRoomIndex === index ? "open" : ""
                        }`}
                      >
                        <ul className="formTour__dropdown-list">
                          {RoomValue.map((item, key) => (
                            <li
                              key={key}
                              className={`formTour__dropdown-item ${
                                room.type === item ? "active" : ""
                              }`}
                              onClick={() => {
                                handleArrayObjectChange(
                                  "rooms",
                                  index,
                                  "type",
                                  item
                                );
                              }}
                            >
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="formTour__food-label-block">
                    <label htmlFor={`${room.images}-${index}`}>
                      Изображение:
                    </label>
                    <input
                      id={`${room.images}-${index}`}
                      value={room.images}
                      onChange={(e) => {
                        handleArrayObjectChange(
                          "rooms",
                          index,
                          "images",
                          e.target.value
                        );
                      }}
                    />
                  </div>
                  <div className="formTour__food-label-block">
                    <label htmlFor={`${room.price}-${index}`}>Цена:</label>
                    <input
                      id={`${room.price}-${index}`}
                      type="number"
                      value={room.price}
                      onChange={(e) =>
                        handleArrayObjectChange(
                          "rooms",
                          index,
                          "price",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  {room.details.map((item, i) => {
                    const inputId = `rooms-${index}-detail-${i}`;
                    return (
                      <div key={i} className="formTour__field-detail">
                        <div>
                          <label htmlFor={inputId}>Деталь:</label>
                          <input
                            id={inputId}
                            value={item}
                            onChange={(e) =>
                              handleArrayInArrayChange(
                                "rooms",
                                index,
                                "details",
                                i,
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteNested("rooms", index, "details", i)
                          }
                        >
                          Удалить
                        </button>
                      </div>
                    );
                  })}
                  <div className="formTour__field-btns">
                    <button
                      type="button"
                      className="formTour__field-btn--add"
                      onClick={() =>
                        handleAddNestedArrayItem("rooms", index, "details", "")
                      }
                    >
                      Добавить деталь
                    </button>
                    {/* Кнопка удалить план */}
                    <button
                      type="button"
                      className="formTour__field-btn--remove"
                      onClick={() => handleDeleteArrayItem("rooms", index)}
                    >
                      Удалить всё
                    </button>
                  </div>
                </div>
              ))}
              <div className="formTour__block-btn">
                <button
                  type="button"
                  className="formTour__form-room-content-btn"
                  onClick={() =>
                    handleAddArrayItem("rooms", {
                      type: "",
                      price: 0,
                      images: "",
                      details: [""],
                    })
                  }
                >
                  Добавить
                </button>
              </div>
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
