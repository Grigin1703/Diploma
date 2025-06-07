import "../../form/FormTour/FormTour.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getByIdTour, updateTour, createTour } from "@/api/tours.js";
import Logo from "@/components/layout/header/logo/logo";

import TourBasicInfoForm from "../../form/FormTour/TourBasicInfoForm/TourBasicInfoForm";
import TourFoodInfoForm from "../../form/FormTour/TourFoodInfoForm/TourFoodInfoForm";
import TourRoomInfoForm from "../../form/FormTour/TourRoomInfoForm/TourRoomInfoForm";
import TourImagesInfoForm from "../../form/FormTour/TourImagesInfoForm/TourImagesInfoForm";
import TourAllInfoForm from "../../form/FormTour/TourAllInfoForm/TourAllInfoForm";

export default function EditTour() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    title: "",
    sub_title: "",
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
  });

  const [activeNavBtn, setActiveNavBtn] = useState("btn_1");

  useEffect(() => {
    if (isEditMode) {
      (async () => {
        try {
          const tour = await getByIdTour(id);
          setFormData(tour);
        } catch (err) {
          alert("Ошибка загрузки тура: " + err);
        }
      })();
    } else {
      setFormData((prev) => ({
        ...prev,
        imges: [{ image_url: [""] }],
      }));
    }
  }, [id]);

  const heandleNavBtnClick = (e) => {
    setActiveNavBtn(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateTour(id, formData);
        alert("Тур успешно обновлён");
      } else {
        await createTour(formData);
        alert("Тур успешно создан");
      }
      navigate("/admin");
    } catch (err) {
      alert(`Ошибка при сохранении тура: ${err}`);
    }
  };

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

  const handleScip = () => {
    navigate("/admin");
  };

  return (
    <>
      <header className="header">
        <div className="container header__container">
          <Logo admin />
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
          edit
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
        <TourImagesInfoForm
          handleSubmit={handleSubmit}
          formData={formData}
          handleAddImage={handleAddImage}
          handleDeleteNested={handleDeleteNested}
          handleArrayInArrayChange={handleArrayInArrayChange}
        />
        <TourAllInfoForm
          handleSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
          handleArrayChange={handleArrayChange}
          handleAddArrayItem={handleAddArrayItem}
          handleDeleteArrayItem={handleDeleteArrayItem}
          handleArrayObjectChange={handleArrayObjectChange}
        />
      </main>
    </>
  );
}
