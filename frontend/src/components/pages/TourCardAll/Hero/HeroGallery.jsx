import { useState } from "react";

export default function HeroGallery({ images = [], setImgMain, openModal }) {
  const [activeImg, setActiveImg] = useState(images[0]);

  const handleClick = (img) => {
    setActiveImg(img);
    setImgMain(img);
  };

  return (
    <ul className="hero__gallery-list">
      <li className="hero__gallery-imgMain">
        <img src={activeImg} alt="main preview" />
      </li>

      {images.slice(0, -7).map((img, index) => (
        <li
          key={index}
          className="hero__gallery-item"
          onClick={() => handleClick(img)}
        >
          <img src={img} alt="preview" />
        </li>
      ))}

      <li className="hero__gallery-lastItem">
        <button onClick={openModal}>
          <img src={images[3]} alt="open modal" />
        </button>
      </li>
    </ul>
  );
}
