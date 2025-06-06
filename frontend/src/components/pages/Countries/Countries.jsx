import "./Countries.scss";
import { Countries } from "@/data/dataCountries";
import CountryGroupBlock from "./CountryGroupBlock";

export default function CountriesContent() {
  const groupedBy = [
    ["А", "Б", "В"],
    ["И", "К", "Н"],
    ["П", "С", "Т"],
  ];
  return (
    <section className="countries__content">
      <div className="container">
        <h2 className="countries__title">туры по странам</h2>
        <div className="countries__grid">
          {groupedBy.map((group, i) => (
            <div
              key={i}
              className={`countries__grid-${["left", "center", "right"][i]}`}
            >
              {group.map((letter) => {
                const groupCountries = Countries.filter(
                  (item) => item.name.charAt(0).toUpperCase() === letter
                );

                return (
                  <CountryGroupBlock
                    key={letter}
                    letter={letter}
                    countries={groupCountries}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
