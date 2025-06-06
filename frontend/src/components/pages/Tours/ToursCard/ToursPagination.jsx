import BtnNext from "@/assets/icons/swiper-next.svg";
import BtnPrev from "@/assets/icons/swiper-prev.svg";

export default function ToursPagination({ page, setPage, totalPages }) {
  return (
    <div className="toursCard__btn-block">
      <button
        className={`toursCard__btn-swiper ${page === 1 ? "hidden" : ""}`}
        onClick={() => setPage(page - 1)}
      >
        <img src={BtnPrev} alt="" />
      </button>

      <div className="toursCard__page-block">
        <span>{page}</span> из {totalPages}
      </div>
      <button
        onClick={() => setPage(page + 1)}
        className={`toursCard__btn-swiper ${
          page === totalPages ? "hidden" : ""
        }`}
      >
        <img src={BtnNext} alt="" />
      </button>
    </div>
  );
}
