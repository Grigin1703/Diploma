import { useRef, useState, useEffect } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function HeroGalleryModalCombined({
  images = [],
  isOpen,
  onClose,
}) {
  const contentRef = useRef(null);
  const fullscreenContentRef = useRef(null);

  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  useOutsideClick(contentRef, () => {
    if (!fullscreenOpen) onClose();
  });

  useOutsideClick(fullscreenContentRef, () => {
    if (fullscreenOpen) handleFullscreenClose();
  });

  useEffect(() => {
    if (isOpen || fullscreenOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, fullscreenOpen]);

  const handleFullscreenOpen = (img) => {
    setFullscreenImg(img);
    setFullscreenOpen(true);
  };

  const handleFullscreenClose = () => {
    setFullscreenOpen(false);
    setFullscreenImg(null);
  };

  if (!isOpen) return null;

  return (
    <div className="hero__gallery-modal-wrapper">
      <div className="hero__gallery-modal-content" ref={contentRef}>
        <div className="gallery__modal-header">
          <h2 className="gallery__modal-title">Все фото</h2>
          <button className="gallery__modal-btn" onClick={onClose}>
            <span></span>
            <span></span>
          </button>
        </div>
        <ul className="gallery__modal-list">
          {images.map((img, index) => (
            <li key={index}>
              <button onClick={() => handleFullscreenOpen(img)}>
                <img src={img} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {fullscreenOpen && (
        <div className="hero__gallery-fullscreen-wrapper">
          <button
            className="gallery__modal-btn fullscreen"
            onClick={handleFullscreenClose}
          >
            <span></span>
            <span></span>
          </button>
          <div
            className="hero__gallery-fullscreen-content"
            ref={fullscreenContentRef}
          >
            <img src={fullscreenImg} alt="fullscreen" />
          </div>
        </div>
      )}
    </div>
  );
}
