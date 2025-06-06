export default function HotelBeaches({ beaches }) {
  return (
    <div className="main__beaches">
      <h2 className="main__subtitle">пляжи</h2>
      <div className="main__beaches-content">
        <strong>Пляжи отеля</strong>
        <ul className="main__beaches-list">
          {beaches.map((beach, index) => (
            <li key={index}>{beach}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
