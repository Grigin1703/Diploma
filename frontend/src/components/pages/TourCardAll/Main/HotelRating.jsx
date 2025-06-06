export default function HotelRating({ ratingDetails, getAverageRating }) {
  return (
    <div className="main__rating">
      <h2
        className="main__subtitle rating__title"
        data-rating={getAverageRating(ratingDetails)}
      >
        рейтинг отеля
      </h2>
      <ul className="main__rating-list">
        {ratingDetails.map((item, index) => (
          <li key={index} data-rating={Number(item.rating).toFixed(1)}>
            <span>{item.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
