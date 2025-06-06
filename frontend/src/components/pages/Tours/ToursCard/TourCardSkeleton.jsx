import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TourCardSkeleton() {
  return (
    <div className="toursCard">
      <div className="toursCard__swiper">
        <Skeleton height={200} />
      </div>
      <div className="toursCard__center">
        <Skeleton height={20} width="60%" style={{ marginBottom: 10 }} />
        <Skeleton height={15} width="40%" />
        <div style={{ display: "flex", gap: 8, margin: "10px 0" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width={20} height={20} circle />
          ))}
        </div>
        <Skeleton height={15} width="30%" />
        <Skeleton height={15} width="70%" style={{ marginTop: 10 }} />
      </div>
      <div className="toursCard__right">
        <Skeleton height={20} width="80%" style={{ marginBottom: 10 }} />
        <Skeleton height={30} width="100px" />
      </div>
    </div>
  );
}
