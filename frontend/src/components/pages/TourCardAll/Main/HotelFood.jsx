export default function HootelFood({
  mealPlans = [],
  selectedFood,
  onSelectFood,
}) {
  const handleClick = (type) => {
    onSelectFood(type);
  };

  return (
    <div className="main__food">
      <h2 className="main__subtitle">Еда</h2>
      {mealPlans.map((item, i) => {
        const isActive = item.type === selectedFood;
        const selectedPlan = mealPlans.find(
          (plan) => plan.type === selectedFood
        ) || { price: 0 };
        const priceDiff = item.price - selectedPlan.price;
        return (
          <div key={i} className="main__food-block">
            <div className="main__food-header">
              <strong>{item.type}</strong>
              <button
                className={`main__card-btn ${isActive ? "active" : ""}`}
                data-status={
                  isActive
                    ? "в цене"
                    : `${priceDiff > 0 ? "+" : "-"}${Math.abs(priceDiff).toLocaleString("ru-RU")}₽`
                }
                onClick={() => handleClick(item.type)}
              >
                {isActive ? "Выбрано" : "Выбрать"}
              </button>
            </div>
            <ul className="main__food-list">
              {item.details.map((detail, key) => (
                <li key={key}>{detail}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
