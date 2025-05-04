import Swiper from "../../Swiper/Swiper";
import ToursSlide from "./ToursSlide";
import { SlideTours } from "../../../data/data";
import "./Tours.scss";

export default function Tours() {
  const slides = [
    <ToursSlide
      days={SlideTours[5].days}
      price={SlideTours[5].price}
      country={SlideTours[5].country}
      city={SlideTours[5].city}
      date={SlideTours[5].date}
      img={SlideTours[5].img}
    />,
    <ToursSlide
      days={SlideTours[5].days}
      price={SlideTours[5].price}
      country={SlideTours[5].country}
      city={SlideTours[5].city}
      date={SlideTours[5].date}
      img={SlideTours[5].img}
    />,
    <ToursSlide
      days={SlideTours[5].days}
      price={SlideTours[5].price}
      country={SlideTours[5].country}
      city={SlideTours[5].city}
      date={SlideTours[5].date}
      img={SlideTours[5].img}
    />,
    <ToursSlide
      days={SlideTours[4].days}
      price={SlideTours[4].price}
      country={SlideTours[4].country}
      city={SlideTours[4].city}
      date={SlideTours[4].date}
      img={SlideTours[4].img}
    />,
    <ToursSlide
      days={SlideTours[3].days}
      price={SlideTours[3].price}
      country={SlideTours[3].country}
      city={SlideTours[3].city}
      date={SlideTours[3].date}
      img={SlideTours[3].img}
    />,
    <ToursSlide
      days={SlideTours[2].days}
      price={SlideTours[2].price}
      country={SlideTours[2].country}
      city={SlideTours[2].city}
      date={SlideTours[2].date}
      img={SlideTours[2].img}
    />,
    <ToursSlide
      days={SlideTours[1].days}
      price={SlideTours[1].price}
      country={SlideTours[1].country}
      city={SlideTours[1].city}
      date={SlideTours[1].date}
      img={SlideTours[1].img}
    />,
    <ToursSlide
      days={SlideTours[0].days}
      price={SlideTours[0].price}
      country={SlideTours[0].country}
      city={SlideTours[0].city}
      date={SlideTours[0].date}
      img={SlideTours[0].img}
    />,
  ];
  return (
    <section className="tours">
      <div className="container-right">
        <h2 className="tours__title">горящие туры</h2>
        <span className="tours__subtitle">Поймайте момент</span>
        <div className="tours__swiper">
          <Swiper slides={slides} spaceBetween={36} slidesPerView={5.3} />
        </div>
      </div>
    </section>
  );
}
