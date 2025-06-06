export default function AmenitiesFilter({
  amenities,
  selected,
  strict,
  toggleStrict,
  onChange,
}) {
  return (
    <div className="main__block-filter">
      <div className="main__filter-amenities-header">
        <h3>Удобства</h3>
        <button onClick={() => toggleStrict((prev) => !prev)}>
          {strict ? "Все совпадения" : "Частичное совпадение"}
        </button>
      </div>
      {amenities.map((amenity) => (
        <label key={amenity}>
          <input
            type="checkbox"
            value={amenity}
            checked={selected.includes(amenity)}
            onChange={onChange}
          />
          <span>{amenity}</span>
        </label>
      ))}
    </div>
  );
}
