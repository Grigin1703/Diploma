import AboutHotelBlock from "./AboutHotelBlock";

export default function AboutHotel({
  general = [],
  sports = [],
  pool = [],
  spa = [],
  services = [],
  contacts = [],
}) {
  return (
    <div className="main__aboutHotel">
      <h2 className="main__subtitle">Об отеле</h2>
      <div className="main__aboutHotel-content">
        <AboutHotelBlock title="В общем" items={general} />
        <AboutHotelBlock title="Спорт и развлечения" items={sports} />
        <AboutHotelBlock title="Бассейн" items={pool} />
        <AboutHotelBlock title="Спа" items={spa} />
        <AboutHotelBlock title="Услуги" items={services} />
        <AboutHotelBlock title="Контакты" items={contacts} />
      </div>
    </div>
  );
}
