import StarRating from "@/assets/icons/star1.svg";

export default function RatingFilter({ ratings, selected, onChange }) {
  return (
    <div className="main__block-filter">
      <h3>Рейтинг отеля</h3>
      {ratings.sort((a, b) => b - a).map((rating) => (
        <label key={rating}>
          <input type="checkbox" value={rating} checked={selected.includes(Number(rating))} onChange={onChange} />
          <span>
            {rating} <img src={StarRating} alt="" />
          </span>
        </label>
      ))}
    </div>
  );
}
