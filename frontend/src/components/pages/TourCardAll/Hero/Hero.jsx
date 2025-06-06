import "./Hero.scss";
import { useState} from "react";
import StarRating from "@/assets/icons/star1.svg";

import HeroGallery from "./HeroGallery";
import HeroGalleryModalCombined from "./HeroGalleryModalCombined";

export default function Hero({ tour, getAverageRating }) {
  const images = tour.imges?.[0]?.image_url || [];
  const [imgMain, setImgMain] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="hero__card">
      <div className="container">
        <div className="hero__top-content">
          <div className="hero__gallery">
            <HeroGallery
              images={images}
              mainImg={imgMain}
              setImgMain={setImgMain}
              openModal={handleOpenModal}
            />

            {isModalOpen && (
              <HeroGalleryModalCombined
                images={images}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </div>
        </div>

        <div className="hero__title-block">
          <span className="hero__subtitle">{tour.title}</span>
          <h1 className="hero__title">{tour.sub_title}</h1>
          <div
            className="hero__rating-block"
            data-rating={getAverageRating(tour.rating_details)}
          >
            {Array.from({ length: tour.rating }, (_, index) => (
              <img key={index} src={StarRating} alt="Star" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
