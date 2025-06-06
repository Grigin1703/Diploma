import Swiper from "@/components/common/Swiper/Swiper";
import ToursSlide from "./ToursSlide";
import { getTours } from "@/api/tours";
import { useEffect, useState } from "react";
import "./Tours.scss";

import { motion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

export default function Tours() {
  const { isLoading, setIsLoading } = useLoading();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      try {
        const response = await getTours();
        setTours(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибочка", error);
      }
    };
    fetchTours();
  }, []);

  const tourSlides = isLoading
    ? Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <ToursSlide isLoading={isLoading} />
        </div>
      ))
    : tours
        .filter((tour) => tour.season === "Горящие туры")
        .map((tour, index) => (
          <motion.div
            key={tour.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ToursSlide
              id={tour.id}
              days={tour.duration_min}
              price={tour.pricesByDuration[6]}
              country={tour.title}
              city={tour.sub_title}
              img={tour.imges?.[0]?.image_url[0]}
              isLoading={isLoading}
            />
          </motion.div>
        ));

  return (
    <section className="tours">
      <div className="container-right">
        <h2 className="tours__title">горящие туры</h2>
        <span className="tours__subtitle">Поймайте момент</span>
        <div className="tours__swiper">
          <Swiper slides={tourSlides} spaceBetween={36} slidesPerView={5.3} />
        </div>
      </div>
    </section>
  );
}
