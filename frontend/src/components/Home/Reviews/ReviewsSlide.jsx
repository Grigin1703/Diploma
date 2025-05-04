import Staricon from "../../../assets/icons/star.svg";

export default function ReviewsSlide(props) {
  return (
    <div className="reviews__slide-content">
      <div className="reviews__slide-img">
        <img src={props.imgAvatar} alt="" />
        <img src={Staricon} alt="" />
      </div>
      <div className="reviews__slide-user-site">
        <span>{props.who}</span>
        <span>{props.where}</span>
      </div>
      <p className="reviews__slide-desc">{props.description}</p>
    </div>
  );
}
