export default function ImageBlock({ block, index, onChange, onRemove }) {
  return (
    <div className="formNews__img-block">
      <div className="formNews__img-wrapper">
        {block.img.map((img, i) => (
          <div key={i}>
            <label htmlFor={`img-${index}-${i}`}>Изображение:</label>
            <input
              id={`img-${index}-${i}`}
              value={img}
              onChange={(e) => onChange(index, i, e.target.value)}
              placeholder={`URL картинки ${i + 1}`}
            />
          </div>
        ))}
      </div>
      <button className="fromNews__removeBlock" onClick={() => onRemove(index)}>
        Удалить блок
      </button>
    </div>
  );
}
