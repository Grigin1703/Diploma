import { useState, useRef, useEffect } from "react";

export default function TourFoodInfoForm({
  formData,
  handleSubmit,
  handleArrayObjectChange,
  handleArrayInArrayChange,
  handleDeleteNested,
  handleAddNestedArrayItem,
  handleDeleteArrayItem,
  handleAddArrayItem,
}) {
  const [openFoodIndex, setOpenFoodIndex] = useState(null);
  const FoodValue = [
    "All inclusive ultra",
    "All inclusive",
    "2-х разовое питание",
    "Только завтраки",
  ];
  const foodRefs = useRef([]);
  const toggleFoodOpen = (index) => {
    setOpenFoodIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      foodRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target)) {
          setOpenFoodIndex((prev) => (prev === index ? null : prev));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="formTour__food formTour__section" id="food">
      <div className="container">
        <h2 className="formTour__section-title">Еда:</h2>
        <form onSubmit={handleSubmit} className="formTour__form">
          <div className="formTour__field">
            <div className="formTour__field-inputs">
              {formData.mealPlans.map((food, index) => (
                <div key={index} className="formTour__field-row">
                  <div className="formTour__food-label-block">
                    <label>Категория:</label>
                    <div
                      className={`formTour__dropdown ${
                        openFoodIndex === index ? "focus" : ""
                      }`}
                      onClick={() => toggleFoodOpen(index)}
                      ref={(el) => (foodRefs.current[index] = el)}
                    >
                      <div className="formTour__dropdown-value">
                        <span>
                          {food.type === "" ? "Указать категорию" : food.type}
                        </span>
                      </div>
                      <div
                        className={`formTour__dropdown-list-wrapper ${
                          openFoodIndex === index ? "open" : ""
                        }`}
                      >
                        <ul className="formTour__dropdown-list">
                          {FoodValue.map((item, key) => (
                            <li
                              key={key}
                              className={`formTour__dropdown-item ${
                                food.type === item ? "active" : ""
                              }`}
                              onClick={() => {
                                handleArrayObjectChange(
                                  "mealPlans",
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
                    <label htmlFor={`foodPrice-${index}`}>Цена:</label>
                    <input
                      id={`foodPrice-${index}`}
                      type="number"
                      value={food.price}
                      onChange={(e) =>
                        handleArrayObjectChange(
                          "mealPlans",
                          index,
                          "price",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  {food.details.map((item, i) => {
                    const inputId = `mealPlans-${index}-detail-${i}`;
                    return (
                      <div key={i} className="formTour__field-detail">
                        <div>
                          <label htmlFor={inputId}>Деталь:</label>
                          <input
                            id={inputId}
                            value={item}
                            onChange={(e) =>
                              handleArrayInArrayChange(
                                "mealPlans",
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
                            handleDeleteNested("mealPlans", index, "details", i)
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
                        handleAddNestedArrayItem(
                          "mealPlans",
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
                      className="formTour__field-btn--remove"
                      onClick={() => handleDeleteArrayItem("mealPlans", index)}
                    >
                      Удалить всё
                    </button>
                  </div>
                </div>
              ))}
              <div className="formTour__block-btn">
                <button
                  type="button"
                  onClick={() =>
                    handleAddArrayItem("mealPlans", {
                      type: "",
                      price: 0,
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
