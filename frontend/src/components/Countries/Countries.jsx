import { Countries } from "@/data/dataCountries";
import "./Countries.scss";

export default function CountriesContent() {
  return (
    <section className="countries__content">
      <div className="container">
        <h2 className="countries__title">туры по странам</h2>
        <div className="countries__grid">
          <div className="countries__grid-left">
            <ul className="countries__list" data-title='А'>
              <li className="countries__item">
                <img src={Countries.Abkhazia.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Abkhazia.name}</h3>
                  <span>{Countries.Abkhazia.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Andorra.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Andorra.name}</h3>
                  <span>{Countries.Andorra.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Aruba.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Aruba.name}</h3>
                  <span>{Countries.Aruba.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Armenia.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Armenia.name}</h3>
                  <span>{Countries.Armenia.desc}</span>
                </div>
              </li>
            </ul>
            <ul className="countries__list" data-title='Б'>
              <li className="countries__item">
                <img src={Countries.Brazil.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Brazil.name}</h3>
                  <span>{Countries.Brazil.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Belgium.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Belgium.name}</h3>
                  <span>{Countries.Belgium.desc}</span>
                </div>
              </li>
            </ul>
            <ul className="countries__list" data-title='В'>
              <li className="countries__item">
                <img src={Countries.Hungary.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Hungary.name}</h3>
                  <span>{Countries.Hungary.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Vietnam.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Vietnam.name}</h3>
                  <span>{Countries.Vietnam.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Venezuela.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Venezuela.name}</h3>
                  <span>{Countries.Venezuela.desc}</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="countries__grid-center">
            <ul className="countries__list" data-title='И'>
              <li className="countries__item">
                <img src={Countries.Israel.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Israel.name}</h3>
                  <span>{Countries.Israel.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Spain.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Spain.name}</h3>
                  <span>{Countries.Spain.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Italy.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Italy.name}</h3>
                  <span>{Countries.Italy.desc}</span>
                </div>
              </li>
            </ul>
            <ul className="countries__list" data-title='К'>
              <li className="countries__item">
                <img src={Countries.Qatar.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Qatar.name}</h3>
                  <span>{Countries.Qatar.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Cyprus.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Cyprus.name}</h3>
                  <span>{Countries.Cyprus.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.China.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.China.name}</h3>
                  <span>{Countries.China.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.CostaRica.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.CostaRica.name}</h3>
                  <span>{Countries.CostaRica.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Cuba.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Cuba.name}</h3>
                  <span>{Countries.Cuba.desc}</span>
                </div>
              </li>
            </ul>
            <ul className="countries__list" data-title='Н'>
              <li className="countries__item">
                <img src={Countries.Nepal.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Nepal.name}</h3>
                  <span>{Countries.Nepal.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Netherlands.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Netherlands.name}</h3>
                  <span>{Countries.Netherlands.desc}</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="countries__grid-right">
            <ul className="countries__list" data-title='П'>
              <li className="countries__item">
                <img src={Countries.Panama.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Panama.name}</h3>
                  <span>{Countries.Panama.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Peru.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Peru.name}</h3>
                  <span>{Countries.Peru.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Portugal.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Portugal.name}</h3>
                  <span>{Countries.Portugal.desc}</span>
                </div>
              </li>
            </ul>
            <ul className="countries__list" data-title='С'>
              <li className="countries__item">
                <img src={Countries.SaudiArabia.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.SaudiArabia.name}</h3>
                  <span>{Countries.SaudiArabia.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Serbia.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Serbia.name}</h3>
                  <span>{Countries.Serbia.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Singapore.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Singapore.name}</h3>
                  <span>{Countries.Singapore.desc}</span>
                </div>
              </li>
            </ul>
            <ul className="countries__list" data-title='Т'>
              <li className="countries__item">
                <img src={Countries.Thailand.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Thailand.name}</h3>
                  <span>{Countries.Thailand.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Tunisia.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Tunisia.name}</h3>
                  <span>{Countries.Tunisia.desc}</span>
                </div>
              </li>
              <li className="countries__item">
                <img src={Countries.Türkiye.img} alt="" />
                <div className="countries__info">
                  <h3>{Countries.Türkiye.name}</h3>
                  <span>{Countries.Türkiye.desc}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
