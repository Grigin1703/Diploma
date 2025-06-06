export default function ForChildren({ conveniences = [] }) {
  return (
    <div className="main__forChildren">
      <h2 className="main__subtitle">Для детей</h2>
      <div className="main__forChildren-content">
        <strong>удобства</strong>
        <ul className="main__forChildren-list">
          {conveniences.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
