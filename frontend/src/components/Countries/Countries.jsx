import "./Countries.scss";
import { Countries } from "@/data/dataCountries";
import { Link } from "react-router-dom";

export default function CountriesContent() {
  return (
    <section className="countries__content">
      <div className="container">
        <h2 className="countries__title">туры по странам</h2>
        <div className="countries__grid">
          <div className="countries__grid-left">
            <div className="countries__block" data-title="А">
              {Countries.filter((item) => item.name.charAt(0) === "А").map(
                (item, index) => (
                  <Link
                    key={index}
                    to={`/Tours?country=${encodeURIComponent(item.name)}`}
                  >
                    <li className="countries__item">
                      <img src={item.img} alt="" />
                      <div className="countries__info">
                        <h3>{item.name}</h3>
                        <span>{item.desc}</span>
                      </div>
                    </li>
                    {console.log(item.name)}
                  </Link>
                )
              )}
            </div>
            <div className="countries__block" data-title="Б">
              {Countries.filter((item) => item.name.charAt(0) === "Б").map(
                (item, index) => (
                  <Link
                    key={index}
                    to={`/Tours?country=${encodeURIComponent(item.name)}`}
                  >
                    <li className="countries__item">
                      <img src={item.img} alt="" />
                      <div className="countries__info">
                        <h3>{item.name}</h3>
                        <span>{item.desc}</span>
                      </div>
                    </li>
                  </Link>
                )
              )}
            </div>
            <div className="countries__block" data-title="В">
              {Countries.filter((item) => item.name.charAt(0) === "В").map(
                (item, index) => (
                  <Link
                    key={index}
                    to={`/Tours?country=${encodeURIComponent(item.name)}`}
                  >
                    <li className="countries__item">
                      <img src={item.img} alt="" />
                      <div className="countries__info">
                        <h3>{item.name}</h3>
                        <span>{item.desc}</span>
                      </div>
                    </li>
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="countries__grid-center">
            <div className="countries__block" data-title="И">
              {Countries.filter((item) => item.name.charAt(0) === "И").map(
                (item, index) => (
                  <Link
                    key={index}
                    to={`/Tours?country=${encodeURIComponent(item.name)}`}
                  >
                    <li className="countries__item">
                      <img src={item.img} alt="" />
                      <div className="countries__info">
                        <h3>{item.name}</h3>
                        <span>{item.desc}</span>
                      </div>
                    </li>
                  </Link>
                )
              )}
            </div>
            <div className="countries__block" data-title="К">
              {Countries.filter((item) => item.name.charAt(0) === "К").map(
                (item, index) => (
                  <Link
                    key={index}
                    to={`/Tours?country=${encodeURIComponent(item.name)}`}
                  >
                    <li className="countries__item">
                      <img src={item.img} alt="" />
                      <div className="countries__info">
                        <h3>{item.name}</h3>
                        <span>{item.desc}</span>
                      </div>
                    </li>
                  </Link>
                )
              )}
            </div>
            <div className="countries__block" data-title="Н">
              {Countries.filter((item) => item.name.charAt(0) === "Н").map(
                (item, index) => (
                  <Link
                    key={index}
                    to={`/Tours?country=${encodeURIComponent(item.name)}`}
                  >
                    <li className="countries__item">
                      <img src={item.img} alt="" />
                      <div className="countries__info">
                        <h3>{item.name}</h3>
                        <span>{item.desc}</span>
                      </div>
                    </li>
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="countries__grid-right">
            <div className="countries__block" data-title="П">
              {Countries.filter((item) => item.name.charAt(0) === "С").map(
                (item, index) => (
                  <Link
                    key={index}
                    to={`/Tours?country=${encodeURIComponent(item.name)}`}
                  >
                    <li className="countries__item">
                      <img src={item.img} alt="" />
                      <div className="countries__info">
                        <h3>{item.name}</h3>
                        <span>{item.desc}</span>
                      </div>
                    </li>
                  </Link>
                )
              )}
            </div>
            <div className="countries__block" data-title="С">
              {Countries.filter((item) => item.name.charAt(0) === "С").map(
                (item, index) => (
                  <Link
                    key={index}
                    to={`/Tours?country=${encodeURIComponent(item.name)}`}
                  >
                    <li className="countries__item">
                      <img src={item.img} alt="" />
                      <div className="countries__info">
                        <h3>{item.name}</h3>
                        <span>{item.desc}</span>
                      </div>
                    </li>
                  </Link>
                )
              )}
            </div>
            <div className="countries__block" data-title="Т">
              {Countries.filter((item) => item.name.charAt(0) === "Т").map(
                (item, index) => (
                  <Link
                    key={index}
                    to={`/Tours?country=${encodeURIComponent(item.name)}`}
                  >
                    <li className="countries__item">
                      <img src={item.img} alt="" />
                      <div className="countries__info">
                        <h3>{item.name}</h3>
                        <span>{item.desc}</span>
                      </div>
                    </li>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
