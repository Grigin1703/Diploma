export default function FilterSection({ title, items, selected, onChange }) {
  return (
    <div className="main__block-filter">
      <h3>{title}</h3>
      {items.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            value={item}
            checked={selected.includes(item)}
            onChange={onChange}
          />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}
