import { Link } from "react-router-dom";

export default function CountryGroupBlock({ letter, countries }) {
  return (
    <div className="countries__block" data-title={letter}>
      {countries.map((item, index) => (
        <Link
          key={index}
          to={`/Tours?country=${encodeURIComponent(item.name)}`}
        >
          <li className="countries__item">
            <img src={item.img} alt={item.name} />
            <div className="countries__info">
              <h3>{item.name}</h3>
              <span>{item.desc}</span>
            </div>
          </li>
        </Link>
      ))}
    </div>
  );
}
