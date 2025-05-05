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
    <section className="editTour__room editTour__section" id="room">
      <div className="container">
        <h2 className="editTour__section-title">Номера:</h2>
        <form onSubmit={handleSubmit} className="editTour__form">
          <div className="editTour__field">
            <div className="editTour__field-inputs">
              {formData.rooms.map((room, index) => (
                <div key={index} className="editTour__field-row">
                  <div className="editTour__food-label-block">
                    <label>Тип:</label>
                    <div
                      className={`editTour__dropdown ${
                        openRoomIndex === index ? "focus" : ""
                      }`}
                      onClick={() => toggleRoomOpen(index)}
                      ref={(el) => (roomRefs.current[index] = el)}
                    >
                      <div className="editTour__dropdown-value">
                        <span>
                          {room.type === "" ? "Указать тип номера" : room.type}
                        </span>
                      </div>
                      <div
                        className={`editTour__dropdown-list-wrapper ${
                          openRoomIndex === index ? "open" : ""
                        }`}
                      >
                        <ul className="editTour__dropdown-list">
                          {RoomValue.map((item, key) => (
                            <li
                              key={key}
                              className={`editTour__dropdown-item ${
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
                  <div className="editTour__food-label-block">
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
                  <div className="editTour__food-label-block">
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
                      <div key={i} className="editTour__field-detail">
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
                  <div className="editTour__field-btns">
                    <button
                      type="button"
                      className="editTour__field-btn--add"
                      onClick={() =>
                        handleAddNestedArrayItem("rooms", index, "details", "")
                      }
                    >
                      Добавить деталь
                    </button>
                    {/* Кнопка удалить план */}
                    <button
                      type="button"
                      className="editTour__field-btn--remove"
                      onClick={() => handleDeleteArrayItem("rooms", index)}
                    >
                      Удалить всё
                    </button>
                  </div>
                </div>
              ))}
              <div className="editTour__block-btn">
                <button
                  type="button"
                  className="editTour__form-room-content-btn"
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
          <button className="editTour__btn" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}
