import "./AdminPanel.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToursAdmin, deleteTour } from "@/api/tours.js";
import { Link } from "react-router-dom";
import Logo from "@/components/logo/logo";
import RatingImg from "@/assets/icons/star1.svg";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const sortedTours = [...tours];

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key == key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key, direction: null };
        return { key, direction: "asc" };
      } else {
        return { key, direction: "asc" };
      }
    });
  };

  const getMinMaxPrice = (tour) => {
    const { duration_min, duration_max, pricesByDuration } = tour;

    if (!pricesByDuration) return { minPrice: 0, maxPrice: 0 };

    const prices = Object.entries(pricesByDuration)
      .filter(([days]) => {
        const d = Number(days);
        return d >= duration_min && d <= duration_max;
      })
      .map(([, price]) => price)
      .filter((p) => p !== undefined);

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return { minPrice, maxPrice };
  };

  if (sortConfig.key && sortConfig.direction) {
    const { key, direction } = sortConfig;
    sortedTours.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (typeof aVal === "string") {
        const result = aVal.localeCompare(bVal);
        return sortConfig.direction === "asc" ? result : -result;
      }

      if (typeof aVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (key === "price") {
        const aPrice = getMinMaxPrice(a).minPrice;
        const bPrice = getMinMaxPrice(b).minPrice;
        return direction === "asc" ? aPrice - bPrice : bPrice - aPrice;
      }

      return 0;
    });
  }

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
      <header className="header">
        <div className="container header__container">
          <Logo admin={true} />
          <nav className="nav">
            <ul className="nav__list">
              <li>
                <Link to="/admin">Туры</Link>
              </li>
              <li>
                <Link to="/admin">Новости</Link>
              </li>
            </ul>
          </nav>
          <button
            className="header__btn"
            onClick={() => navigate("/admin/add")}
          >
            Добавить тур
          </button>
        </div>
      </header>
      <main>
        <section className="table">
          <div className="container">
            <h1 className="table__title">Админ Панель</h1>
            <table className="table__table">
              <thead className="table__head">
                <tr className="table__row">
                  <td className="table__col">№</td>
                  <td
                    className="table__col"
                    onClick={() => handleSort("sub_title")}
                  >
                    Название
                  </td>
                  <td
                    className="table__col"
                    onClick={() => handleSort("title")}
                  >
                    Страна и город
                  </td>
                  <td
                    className="table__col"
                    onClick={() => handleSort("season")}
                  >
                    Сезон
                  </td>
                  <td
                    className="table__col"
                    onClick={() => handleSort("rating")}
                  >
                    Рейтинг
                  </td>
                  <td
                    className="table__col"
                    onClick={() => handleSort("price")}
                  >
                    Мин/Макс цена
                  </td>
                  <td
                    className="table__col"
                    onClick={() => handleSort("duration_min")}
                  >
                    Мин/Макс ночей
                  </td>
                  <td className="table__col">Дейстиве</td>
                </tr>
              </thead>
              <tbody className="table__body">
                {sortedTours.map((tour, index) => (
                  <tr key={index} className="table__row">
                    <td className="table__col">{index + 1}</td>
                    <td className="table__col">{tour.sub_title}</td>
                    <td className="table__col">{tour.title}</td>
                    <td className="table__col">{tour.season}</td>
                    <td className="table__col">
                      {tour.rating} <img src={RatingImg} alt="" />
                    </td>
                    <td className="table__col">
                      {tour.pricesByDuration[
                        `${tour.duration_min}`
                      ].toLocaleString("ru-Ru")}{" "}
                      ₽ -{" "}
                      {tour.pricesByDuration[
                        `${tour.duration_max}`
                      ].toLocaleString("ru-Ru")}{" "}
                      ₽
                    </td>
                    <td className="table__col">
                      от {tour.duration_min} до {tour.duration_max} ночей
                    </td>
                    <td className="table__col table__btns-block">
                      <button
                        className="table__btn"
                        onClick={() => navigate(`/admin/edit/${tour.id}`)}
                      >
                        Редактировать
                      </button>
                      <button
                        className="table__btn"
                        onClick={() => handleTourDelete(tour.id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
