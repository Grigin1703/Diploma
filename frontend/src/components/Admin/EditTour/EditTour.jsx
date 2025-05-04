import "./EditTour.scss";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getByIdTourAdmin, updateTour } from "@/api/tours.js";
import Logo from "@/components/logo/logo";

import TourBasicInfoForm from "./TourBasicInfoForm/TourBasicInfoForm";
import TourFoodInfoForm from "./TourFoodInfoForm/TourFoodInfoForm";
import TourRoomInfoForm from "./TourRoomInfoForm/TourRoomInfoForm";

export default function EditTour() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    sub_title: "",
    price: "",
    pricesByDuration: {
      6: "",
      8: "",
      10: "",
      12: "",
      15: "",
      20: "",
    },
    season: "",
    advantages: "",
    about_hotel: [],
    amenities: [],
    beaches: [],
    contacts: [],
    distance_airport: [],
    duration_min: "",
    duration_max: "",
    for_children: [],
    imges: [], // тут будут объекты с URL и т.п.
    location_communication: [],
    location_neighborhood: [],
    mealPlans: [], // здесь объекты
    pool: [],
    rating_details: [],
    rating: "",
    rooms: [], // тут массив объектов
    services: [],
    spa: [],
    sports_entertainment: [],
    user_rating_total: "",
  });

  const ratingBlock = useRef(null);
  const durationMinBlock = useRef(null);
  const durationMaxBlock = useRef(null);

  const [activeNavBtn, setActiveNavBtn] = useState("btn_1");
  const heandleNavBtnClick = (e) => {
    setActiveNavBtn(e);
  };

  useEffect(() => {
    const fetchTour = async () => {
      const data = await getByIdTourAdmin(id);
      setFormData(data);
    };
    fetchTour();
  }, [id]);

  // useEffect(() => {
  //   const hendleClickDropdown = (e) => {
  //     if (ratingBlock.current && !ratingBlock.current.contains(e.target)) {
  //       setRatingOpen(false);
  //     }

  //     if (
  //       durationMinBlock.current &&
  //       !durationMinBlock.current.contains(e.target)
  //     ) {
  //       setDurationMinOpen(false);
  //     }

  //     if (
  //       durationMaxBlock.current &&
  //       !durationMaxBlock.current.contains(e.target)
  //     ) {
  //       setDurationMaxOpen(false);
  //     }

  //     if (
  //       openFoodIndex !== null &&
  //       foodRefs.current[openFoodIndex] &&
  //       !foodRefs.current[openFoodIndex].contains(e.target)
  //     ) {
  //       setOpenFoodIndex(null);
  //     }

  //     if (
  //       openRoomIndex !== null &&
  //       roomRefs.current[openRoomIndex] &&
  //       !roomRefs.current[openRoomIndex].contains(e.target)
  //     ) {
  //       setOpenRoomIndex(null);
  //     }
  //   };

  //   document.addEventListener("click", hendleClickDropdown);
  //   return () => {
  //     document.removeEventListener("click", hendleClickDropdown);
  //   };
  // });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const handleArrayObjectChange = (arrayField, index, key, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[arrayField]]; // копируем массив
      updatedArray[index] = {
        ...updatedArray[index], // копируем объект
        [key]: value, // меняем конкретное поле
      };

      return {
        ...prev,
        [arrayField]: updatedArray, // заменяем массив целиком
      };
    });
  };

  const handleArrayInArrayChange = (
    arrayField,
    index,
    nestedArrayField,
    nestedIndex,
    value
  ) => {
    setFormData((prev) => {
      const updatedArray = [...prev[arrayField]];
      const updatedNestedArray = [...updatedArray[index][nestedArrayField]];
      updatedNestedArray[nestedIndex] = value;

      updatedArray[index] = {
        ...updatedArray[index],
        [nestedArrayField]: updatedNestedArray,
      };

      return {
        ...prev,
        [arrayField]: updatedArray,
      };
    });
  };

  // Добавить новый элемент в массив
  const handleAddArrayItem = (arrayField, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [arrayField]: [...prev[arrayField], newItem],
    }));
  };

  const handleAddImage = (outerIndex) => {
    setFormData((prev) => {
      const updated = [...prev.imges];
      const currentUrls = Array.isArray(updated[outerIndex].image_url)
        ? [...updated[outerIndex].image_url]
        : [];

      currentUrls.push("");
      updated[outerIndex].image_url = currentUrls;

      return { ...prev, imges: updated };
    });
  };

  // Удалить элемент из массива
  const handleDeleteArrayItem = (arrayField, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayField]: prev[arrayField].filter((_, i) => i !== index),
    }));
  };

  const handleAddNestedArrayItem = (
    arrayField,
    index,
    nestedArrayField,
    newItem
  ) => {
    setFormData((prev) => {
      const updatedArray = [...prev[arrayField]];
      updatedArray[index] = {
        ...updatedArray[index],
        [nestedArrayField]: [...updatedArray[index][nestedArrayField], newItem],
      };
      return { ...prev, [arrayField]: updatedArray };
    });
  };

  // Удалить элемент из вложенного массива
  const handleDeleteNested = (arrayField, index, nestedField, nestedIndex) => {
    setFormData((prev) => {
      const updatedArray = [...prev[arrayField]];
      const updatedNested = updatedArray[index][nestedField].filter(
        (_, i) => i !== nestedIndex
      );
      updatedArray[index][nestedField] = updatedNested;
      return { ...prev, [arrayField]: updatedArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTour(id, formData);
  };

  const handleScip = () => {
    navigate("/admin");
  };

  const DynamicArrayInput = ({
    label,
    dataKey,
    items,
    onChange,
    onAdd,
    onDelete,
  }) => {
    return (
      <div className="editTour__form-block">
        {items.map((item, index) => (
          <div key={index} className="editTour__form-all-element">
            <div>
              <label htmlFor={`${dataKey}-${index}`}>
                {label} {index + 1}
              </label>
              <input
                id={`${dataKey}-${index}`}
                value={item}
                onChange={(e) => onChange(dataKey, index, e.target.value)}
                placeholder={`${dataKey} ${index + 1}`}
              />
            </div>
            <button type="button" onClick={() => onDelete(dataKey, index)}>
              Удалить
            </button>
          </div>
        ))}
        <button
          className="editTour__form-all-content-btn"
          type="button"
          onClick={() => onAdd(dataKey, "")}
        >
          Добавить
        </button>
      </div>
    );
  };

  return (
    <>
      <header className="header">
        <div className="container header__container">
          <Logo />
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <a
                  href="#basic"
                  className={`nav__btn ${
                    activeNavBtn === "btn_1" ? "active" : ""
                  }`}
                  onClick={() => heandleNavBtnClick("btn_1")}
                >
                  Основные
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#food"
                  className={`nav__btn ${
                    activeNavBtn === "btn_2" ? "active" : ""
                  }`}
                  onClick={() => heandleNavBtnClick("btn_2")}
                >
                  Еда
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#room"
                  className={`nav__btn ${
                    activeNavBtn === "btn_3" ? "active" : ""
                  }`}
                  onClick={() => heandleNavBtnClick("btn_3")}
                >
                  Номера
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#images"
                  className={`nav__btn ${
                    activeNavBtn === "btn_4" ? "active" : ""
                  }`}
                  onClick={() => heandleNavBtnClick("btn_4")}
                >
                  Изображения
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#all"
                  className={`nav__btn ${
                    activeNavBtn === "btn_5" ? "active" : ""
                  }`}
                  onClick={() => heandleNavBtnClick("btn_5")}
                >
                  Общие
                </a>
              </li>
            </ul>
          </nav>
          <button className="header__btn-exit" onClick={() => handleScip()}>
            Назад
          </button>
        </div>
      </header>
      <main>
        <TourBasicInfoForm
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          ratingBlock={ratingBlock}
          durationMinBlock={durationMinBlock}
          durationMaxBlock={durationMaxBlock}
        />
        <TourFoodInfoForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleArrayObjectChange={handleArrayObjectChange}
          handleArrayInArrayChange={handleArrayInArrayChange}
          handleDeleteNested={handleDeleteNested}
          handleAddNestedArrayItem={handleAddNestedArrayItem}
          handleDeleteArrayItem={handleDeleteArrayItem}
          handleAddArrayItem={handleAddArrayItem}
        />

        <TourRoomInfoForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleArrayObjectChange={handleArrayObjectChange}
          handleArrayInArrayChange={handleArrayInArrayChange}
          handleDeleteNested={handleDeleteNested}
          handleAddNestedArrayItem={handleAddNestedArrayItem}
          handleDeleteArrayItem={handleDeleteArrayItem}
          handleAddArrayItem={handleAddArrayItem}
        />
        {/* <section className="editTour__room editTour__section none" id="room">
          <div className="container">
            <h2 className="editTour__section-title">Номера:</h2>
            <form onSubmit={handleSubmit} className="editTour__form">
              <div className="editTour__form-block editTour__form-room-block">
                <div className="editTour__form-room-content">
                  {formData.rooms.map((room, index) => (
                    <div key={index} className="editTour__form-room-flex">
                      <div className="editTour__form-room-label-block">
                        <label>Тип:</label>
                        <div
                          className="editTour__form-room-type"
                          onClick={() => toggleRoomOpen(index)}
                          ref={(el) => (roomRefs.current[index] = el)}
                        >
                          <div className="editTour__form-room-value">
                            <span>
                              {room.type === ""
                                ? "Указать тип номера"
                                : room.type}
                            </span>
                          </div>
                          <div
                            className={`editTour__form-room-dropdown ${
                              openRoomIndex === index ? "open" : ""
                            }`}
                          >
                            <ul className="editTour__form-room-list">
                              {RoomValue.map((item, key) => (
                                <li
                                  key={key}
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
                      <div className="editTour__form-room-label-block">
                        <label>Изображение:</label>
                        <input
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
                      <div className="editTour__form-room-label-block">
                        <label>Цена:</label>
                        <input
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
                          <div key={i} className="editTour__form-room-details">
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
                      <div className="editTour__form-room-btn-block">
                        <button
                          type="button"
                          className="editTour__form-room-btn-add"
                          onClick={() =>
                            handleAddNestedArrayItem(
                              "rooms",
                              index,
                              "details",
                              ""
                            )
                          }
                        >
                          Добавить деталь
                        </button>
                        
                        <button
                          type="button"
                          className="editTour__form-room-btn-remove"
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
        </section> */}
        <section
          className="editTour__images editTour__section none"
          id="images"
        >
          <div className="container">
            <h2 className="editTour__section-title">Изображения:</h2>
            <form onSubmit={handleSubmit} className="editTour__form">
              <div className="editTour__form-block editTour__form-images-block">
                <div className="editTour__form-images-content">
                  {formData.imges.map((img, index) => (
                    <div key={index} className="editTour__form-images-flex">
                      {img.image_url?.map((url, i) => {
                        const inputId = `images-${index}-detail-${i}`;
                        return (
                          <div
                            key={i}
                            className="editTour__form-images-details"
                          >
                            <div>
                              <label htmlFor={inputId}>
                                Изображение {i + 1}:
                              </label>
                              <input
                                id={inputId}
                                value={url}
                                onChange={(e) =>
                                  handleArrayInArrayChange(
                                    "imges",
                                    index,
                                    "image_url",
                                    i,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteNested(
                                  "imges",
                                  index,
                                  "image_url",
                                  i
                                )
                              }
                            >
                              Удалить
                            </button>
                          </div>
                        );
                      })}
                      <div className="editTour__form-images-btn-block">
                        <button
                          type="button"
                          className="editTour__form-images-btn-add"
                          onClick={() => handleAddImage(index)}
                        >
                          Добавить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="editTour__btn" type="submit">
                Сохранить
              </button>
            </form>
          </div>
        </section>
        <section className="edittour__all editTour__section none" id="all">
          <div className="container">
            <h2 className="editTour__section-title">Общие:</h2>
            <form onSubmit={handleSubmit} className="editTour__form">
              <div className="editTour__form-block">
                <div className="editTour__form-all-advantages">
                  <label htmlFor="advantages">Описание:</label>
                  <div className="editTour__form-textarea-block">
                    <textarea
                      id="advantages"
                      name="advantages"
                      value={formData.advantages}
                      onChange={(e) =>
                        handleChange("advantages", e.target.value)
                      }
                      placeholder="Advantages"
                    />
                  </div>
                </div>
              </div>
              <DynamicArrayInput
                label="Удобство"
                dataKey="amenities"
                items={formData.amenities}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <DynamicArrayInput
                label="Басейн"
                dataKey="beaches"
                items={formData.beaches}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <DynamicArrayInput
                label="Cпорт развлечения"
                dataKey="sports_entertainment"
                items={formData.sports_entertainment}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <DynamicArrayInput
                label="Сервис"
                dataKey="services"
                items={formData.services}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <DynamicArrayInput
                label="Для детей"
                dataKey="for_children"
                items={formData.for_children}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <DynamicArrayInput
                label="Контакты"
                dataKey="contacts"
                items={formData.contacts}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <DynamicArrayInput
                label="Бассейн"
                dataKey="pool"
                items={formData.pool}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <DynamicArrayInput
                label="Район"
                dataKey="location_neighborhood"
                items={formData.location_neighborhood}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <DynamicArrayInput
                label="Спа"
                dataKey="spa"
                items={formData.spa}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <DynamicArrayInput
                label="Коммуникация"
                dataKey="location_communication"
                items={formData.location_communication}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <DynamicArrayInput
                label="Аэропорт"
                dataKey="distance_airport"
                items={formData.distance_airport}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <DynamicArrayInput
                label="Деталь отеля"
                dataKey="about_hotel"
                items={formData.about_hotel}
                onChange={handleArrayChange}
                onAdd={handleAddArrayItem}
                onDelete={handleDeleteArrayItem}
              />
              <div className="editTour__form-block editTour__form-all-block">
                <div className="editTour__form-all-content">
                  {formData.rating_details.map((details, index) => (
                    <div key={index} className="editTour__form-all-flex">
                      <div className="editTour__form-all-input-block">
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
                          <label htmlFor={`rating-number-${index}`}>
                            Оценка:
                          </label>
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
                      </div>
                      <button
                        type="button"
                        className="editTour__form-all-btn-remove"
                        onClick={() =>
                          handleDeleteArrayItem("rating_details", index)
                        }
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="editTour__form-all-content-btn"
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
              <button className="editTour__btn" type="submit">
                Сохранить
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
