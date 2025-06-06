export default function HotelAdvantages({ advantages, amenities }) {
  return (
    <div className="main__advantages">
      <h2 className="main__subtitle">почему стоит выбрать этот отель</h2>
      <p className="main__advantages-desc">{advantages}</p>
      <ul className="main__advantages-list">
        {amenities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
