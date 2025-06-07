export default function TextBlock({ block, index, onChange, onRemove }) {
  return (
    <div className="formNews__allText">
      <div className="textarea__block-wrapper">
        <label htmlFor={`allText-${index + 1}`}>Описание:</label>
        <div className="textarea__block">
          <textarea
            id={`allText-${index + 1}`}
            value={block.text[0].desc}
            onChange={(e) => onChange(index, e.target.value)}
          />
        </div>
      </div>
      <button className="fromNews__removeBlock" onClick={() => onRemove(index)}>
        Удалить блок
      </button>
    </div>
  );
}
