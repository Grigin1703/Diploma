import { Link } from "react-router-dom";
import "./Nav.scss";

export default function Nav({ footer }) {
  return (
    <nav className="menu">
      <ul className={footer ? "menu__lust__footer" : "menu__lust"}>
        <li className="menu__item">
          <Link to="/Tours" className={footer ? "menu__link__footer" : "menu__link"}>
            Подбор тура
          </Link>
        </li>
        <li className="menu__item">
          <Link to="/HotTours" className={footer ? "menu__link__footer" : "menu__link menu__link_primary"}>
            Горящие туры
          </Link>
        </li>
        <li className="menu__item">
          <Link to="/Countries" className={footer ? "menu__link__footer" : "menu__link"}>
            Страны
          </Link>
        </li>
        {footer ? (
          <>
            <li className="menu__item">
              <Link to="/Countries" className="menu__link__footer">
                О нас
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/Countries" className="menu__link__footer">
                Контакты
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
}
