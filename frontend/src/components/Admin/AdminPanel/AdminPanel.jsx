import "./AdminPanel.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToursAdmin, deleteTour } from "@/api/tours.js";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await getToursAdmin();
        setTours(data);
      } catch (err) {
        console.error("Ошибка", err);
      }
    };

    fetchTour();
  }, []);

  const handleBack = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleTourDelete = async (id) => {
    if (window.confirm("Удаляем?")) {
      try {
        await deleteTour(id);
        setTours((prev) => prev.filter((tour) => tour.id !== id));
      } catch (err) {
        console.error("Ошибка при удалении тура:", err);
      }
    }
  };
  return (
    <>
      <div>
        <div className="container">
          <h1>Панель администратора</h1>
          <p>Здесь будет CRUD для туров и прочее.</p>
          <button onClick={handleBack}>Scip</button>

          <ul className="ul">
            {tours.map((tour, i) => (
              <li key={i}>
                <img src={tour.imges?.[0].image_url?.[3]} alt="" />
                <h2>{tour.title}</h2>
                <strong>{tour.season}</strong>
                <p>{tour.id}</p>
                <button onClick={() => handleTourDelete(tour.id)}>
                  Удалить
                </button>
                <button onClick={() => navigate(`/admin/edit/${tour.id}`)}>
                  Редактировать
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
