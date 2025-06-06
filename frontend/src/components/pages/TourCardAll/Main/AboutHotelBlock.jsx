export default function AboutHotelBlock({ title, items }) {
  return (
    <div className="main__aboutHotel-block">
      <strong>{title}</strong>
      <ul className="main__aboutHotel-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
