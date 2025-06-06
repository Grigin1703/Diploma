import UserIcon from "@/assets/icons/user.svg";

export default function HotelRooms({ rooms, room, setRoom, tourist }) {
  const handleRoomType = (type) => {
    setRoom(type);
  };

  const getPriceDiff = (itemPrice) => {
    const selectedPrice = rooms.find((r) => r.type === room)?.price || 0;
    const diff = itemPrice - selectedPrice;
    const sign = diff > 0 ? "+" : "-";
    return `${sign}${Math.abs(diff).toLocaleString("ru-RU")}₽`;
  };

  return (
    <div className="main__numbers">
      <h2 className="main__subtitle">доступные номера</h2>
      <ul className="main__numbers-list">
        {rooms.map((item, index) => (
          <li key={index} className="main__numbers-item">
            <article className="numbers__card">
              <img
                className="numbers__card-img"
                src={item.images}
                alt="Tour image"
              />
              <div className="numbers__card-content">
                <div className="numbers__card-header">
                  <div className="numbers__card-header-left">
                    <h3 className="numbers__card-title">{item.type}</h3>
                    <div
                      className="numbers__card-tourists"
                      data-users={`${tourist} ${
                        tourist === 1 ? "человек" : "человека"
                      }`}
                    >
                      {Array.from({ length: tourist }, (_, index) => (
                        <img key={index} src={UserIcon} alt="UserIcon" />
                      ))}
                    </div>
                  </div>
                  <div className="numbers__card-header-right">
                    <button
                      className={`main__card-btn ${
                        item.type === room ? "active" : ""
                      }`}
                      data-status={
                        item.type === room ? "в цене" : getPriceDiff(item.price)
                      }
                      onClick={() => handleRoomType(item.type)}
                    >
                      {item.type === room ? "Выбрано" : "Выбрать"}
                    </button>
                  </div>
                </div>
                <ul className="numbers__card-list">
                  {item.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
