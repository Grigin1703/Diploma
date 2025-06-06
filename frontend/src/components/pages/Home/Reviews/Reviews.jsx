import Swiper from "@/components/common/Swiper/Swiper";
import ReviewsSlide from "./ReviewsSlide";
import { SlideReviews } from "@/data/data";
import "./Reviews.scss";

export default function Reviews() {
  const slides = [
    <ReviewsSlide
      imgAvatar={SlideReviews[1].imgAvatar}
      iconStar={SlideReviews[1].iconStar}
      who={SlideReviews[1].who}
      where={SlideReviews[1].where}
      description={SlideReviews[1].description}
    />,
    <ReviewsSlide
      imgAvatar={SlideReviews[2].imgAvatar}
      iconStar={SlideReviews[2].iconStar}
      who={SlideReviews[2].who}
      where={SlideReviews[2].where}
      description={SlideReviews[2].description}
    />,
    <ReviewsSlide
      imgAvatar={SlideReviews[0].imgAvatar}
      iconStar={SlideReviews[0].iconStar}
      who={SlideReviews[0].who}
      where={SlideReviews[0].where}
      description={SlideReviews[0].description}
    />,
    <ReviewsSlide
      imgAvatar={SlideReviews[1].imgAvatar}
      iconStar={SlideReviews[1].iconStar}
      who={SlideReviews[1].who}
      where={SlideReviews[1].where}
      description={SlideReviews[1].description}
    />,
    <ReviewsSlide
      imgAvatar={SlideReviews[2].imgAvatar}
      iconStar={SlideReviews[2].iconStar}
      who={SlideReviews[2].who}
      where={SlideReviews[2].where}
      description={SlideReviews[2].description}
    />,
    <ReviewsSlide
      imgAvatar={SlideReviews[3].imgAvatar}
      iconStar={SlideReviews[3].iconStar}
      who={SlideReviews[3].who}
      where={SlideReviews[3].where}
      description={SlideReviews[3].description}
    />,
    <ReviewsSlide
      imgAvatar={SlideReviews[2].imgAvatar}
      iconStar={SlideReviews[2].iconStar}
      who={SlideReviews[2].who}
      where={SlideReviews[2].where}
      description={SlideReviews[2].description}
    />,
  ];
  return (
    <section className="reviews">
      <div className="container">
        <div className="reviews__block-title">
          <h2 className="reviews__title">отзывы</h2>
          <span className="reviews__subtitle">
            Впечатления наших путешественников
          </span>
        </div>
      </div>
      <div className="container-right">
        <div className="reviews__swiper">
          <Swiper slides={slides} slidesPerView={4} />
        </div>
      </div>
    </section>
  );
}
