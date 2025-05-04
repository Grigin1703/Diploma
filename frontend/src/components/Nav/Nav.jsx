import { Link } from "react-router-dom";
import "./Nav.scss";

export default function Nav() {
  return (
    <nav className="menu">
      <ul className="menu__lust">
        <li className="menu__item">
          <Link to="/Tours" className="menu__link">
            Подбор тура
          </Link>
        </li>
        <li className="menu__item">
          <Link to="/HotTours" className="menu__link menu__link_primary">
            Горящие туры
          </Link>
        </li>
        <li className="menu__item">
          <Link to="/Countries" className="menu__link">
            Страны
          </Link>
        </li>
      </ul>
    </nav>
  );
}
