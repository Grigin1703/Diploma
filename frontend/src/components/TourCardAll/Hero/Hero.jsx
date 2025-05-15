import "./Hero.scss";
import { useState, useEffect, useRef } from "react";
import StarRating from "@/assets/icons/star1.svg";
import TourForm from "../TourCardForm/TourCardForm";


export default function Hero({ tour }) {
  const [imgMain, setImgMain] = useState(tour.imges?.[0].image_url?.[0]);
  const modalBlock = useRef(false);
  const modalBlockContent = useRef(false);


  const [fullscreenImg, setFullScreenImg] = useState(null);
  const modalBlockFullscreen = useRef(false);
  const modalBlockFullscreenContent = useRef(false);


  const handlClickImg = (img) => {
    setImgMain(img);
  };

  const openFullscreen = (img) => {
    setFullScreenImg(img);
  };

  const addModalBlock = () => {
    if (modalBlock.current) {
      document.body.style.overflow = "hidden";
      modalBlock.current.classList.add("open");
    }
  };

  const addFullscreen = (img) => {
    if (modalBlockFullscreen.current) {
      modalBlockFullscreen.current.classList.add("open");
      setFullScreenImg(img);
    }
  };

  const removeModalBlock = () => {
    if (modalBlock.current) {
      document.body.style.overflow = "auto";
      modalBlock.current.classList.remove("open");
    }
    removeFullscreen();
  };

  const removeFullscreen = () => {
    if (modalBlockFullscreen.current) {
      modalBlockFullscreen.current.classList.remove("open");
    }
  };

  const handleOutsideClick = (e) => {
    if (
      modalBlockContent.current &&
      !modalBlockContent.current.contains(e.target) &&
      !modalBlockFullscreen.current.contains(e.target)
    ) {
      removeModalBlock();
    }
  };

  const handleOutsideClickFullscreen = (e) => {
    if (
      modalBlockFullscreenContent.current &&
      !modalBlockFullscreenContent.current.contains(e.target)
    ) {
      removeFullscreen();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    document.addEventListener("mousedown", handleOutsideClickFullscreen);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClickFullscreen);
    };
  });

  return (
    <section className="hero__card">
      <div className="container">
        <div className="hero__top-content">
          <div className="hero__gallery">
            <ul className="hero__gallery-list">
              <li className="hero__gallery-imgMain">
                <img src={imgMain} alt="" />
              </li>
              {tour.imges?.[0].image_url?.slice(0, -7).map((img, index) => (
                <li
                  key={index}
                  onClick={() => handlClickImg(img)}
                  className={`hero__gallery-item`}
                >
                  <img src={img} alt="" />
                </li>
              ))}
              <li className="hero__gallery-lastItem">
                <button onClick={addModalBlock}>
                  <img src={tour.imges?.[0].image_url?.[3]} alt="" />
                </button>
              </li>
            </ul>

            <div
              className={`hero__gallery-modal ${
                modalBlock === true ? "open" : ""
              }`}
              ref={modalBlock}
            >
              <div
                className="hero__gallery-modal-content"
                ref={modalBlockContent}
              >
                <div className="gallery__modal-header">
                  <h2 className="gallery__modal-title">Все фото</h2>
                  <button
                    className="gallery__modal-btn"
                    onClick={removeModalBlock}
                  >
                    <span></span>
                    <span></span>
                  </button>
                </div>
                <ul className="gallery__modal-list">
                  {tour.imges?.[0].image_url?.map((img, index) => (
                    <li key={index}>
                      <button onClick={() => addFullscreen(img)}>
                        <img
                          src={img}
                          alt=""
                          loading="lazy"
                          onClick={() => openFullscreen(img)}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`hero__gallery-fullscreen ${
                  modalBlockFullscreen === true ? "open" : ""
                }`}
                ref={modalBlockFullscreen}
              >
                <button
                  className="gallery__modal-btn fullscreen"
                  onClick={removeFullscreen}
                >
                  <span></span>
                  <span></span>
                </button>
                <div
                  className="hero__gallery-fullscreen-content"
                  ref={modalBlockFullscreenContent}
                >
                  <img src={fullscreenImg} alt="" />
                </div>
              </div>
            </div>
          </div>
          <TourForm pricesByDuration={tour.pricesByDuration} rooms={tour.rooms} foods={tour.mealPlans}/>
        </div>

        <div className="hero__title-block">
          <span className="hero__subtitle">{tour.title}</span>
          <h1 className="hero__title">{tour.sub_title}</h1>
          <div
            className="hero__rating-block"
            data-rating={tour.user_rating_total}
          >
            {Array.from({ length: tour.rating }, (_, index) => (
              <img key={index} src={StarRating} alt="Star" />
            ))}
          </div>
          <div className="hero__price-block">
            <span>
              <strong>{tour.pricesByDuration[6].toLocaleString("ru-Ru") + "₽"}</strong> / за 1
              человека
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
