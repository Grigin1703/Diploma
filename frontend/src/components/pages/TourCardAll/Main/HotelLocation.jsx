export default function HotelLocation({ location }) {
  const {
    location_neighborhood = [],
    location_communication = [],
    distance_airport = [],
  } = location;

  return (
    <div className="main__location">
      <h2 className="main__subtitle">Расположение отеля</h2>
      <div className="main__location-content">
        <div className="main__location-block">
          <strong>Окрестности</strong>
          <ul className="main__location-list">
            {location_neighborhood.map((e, key) => (
              <li key={key}>{e}</li>
            ))}
          </ul>
        </div>
        <div className="main__location-block">
          <strong>Коммуникация</strong>
          <ul className="main__location-list">
            {location_communication.map((e, key) => (
              <li key={key}>{e}</li>
            ))}
          </ul>
        </div>
        <div className="main__location-block">
          <strong>Расстояние от аэропорта</strong>
          <ul className="main__location-list">
            {distance_airport.map((e, key) => (
              <li key={key}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
