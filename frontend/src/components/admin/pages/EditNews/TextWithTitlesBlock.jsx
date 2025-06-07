export default function TextWithTitlesBlock({
  block,
  index,
  onChange,
  onRemove,
}) {
  return (
    <div className="formNews__text-wrapper">
      <div>
        {block.text.map((item, i) => (
          <div key={i} className="formNews__text-block">
            <label htmlFor={`title-text-${index}-${i}`}>Заголовок:</label>
            <input
              id={`title-text-${index}-${i}`}
              value={item.title}
              onChange={(e) => onChange(index, i, "title", e.target.value)}
              placeholder="Заголовок"
            />
            <div className="textarea__block-wrapper">
              <label htmlFor={`desc-text-${index}-${i}`}>Описание:</label>
              <div className="textarea__block">
                <textarea
                  id={`desc-text-${index}-${i}`}
                  value={item.desc}
                  onChange={(e) => onChange(index, i, "desc", e.target.value)}
                  placeholder="Текст"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="fromNews__removeBlock" onClick={() => onRemove(index)}>
        Удалить блок
      </button>
    </div>
  );
}
