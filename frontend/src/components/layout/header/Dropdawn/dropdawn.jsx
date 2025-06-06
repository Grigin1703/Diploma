import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dropdawn.scss";

export default function Dropdawn({ isOpen, closeMenu, buttonRef }) {
  const menuRef = useRef(); // ref для меню

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Проверяем, был ли клик вне меню и кнопки
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeMenu, buttonRef]);

  return (
    <div ref={menuRef} className={`dropdawn-menu ${isOpen ? "open" : ""}`}>
      <div className="dropdawn__content">
        <ul className="dropdawn__list">
          <li className="dropdawn__item">
            <h3 className="dropdawn__title">популярные страны</h3>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Турция
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Египет
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Мальдивы
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              ОАЭ
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Куба
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Шри-Ланка
            </Link>
          </li>
        </ul>
        <ul className="dropdawn__list">
          <li className="dropdawn__item">
            <h3 className="dropdawn__title">туристам</h3>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Страны
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Отели
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Подбор тура
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Горящие туры
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Как купить и оплатить тур
            </Link>
          </li>
        </ul>
        <ul className="dropdawn__list">
          <li className="dropdawn__item">
            <h3 className="dropdawn__title">компания</h3>
          </li>
          <li className="dropdawn__item">
            <Link to="/About" className="dropdawn__link">
              О нас
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Отзывы
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/Contact" className="dropdawn__link">
              Контакты
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/News" className="dropdawn__link">
              Новости
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Priority
            </Link>
          </li>
          <li className="dropdawn__item">
            <Link to="/" className="dropdawn__link">
              Агентам
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
