import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getByIdTour } from "@/api/tours.js";
import Herader from "@/components/HeaderWithMenu/HeaderWithMenu";
import Hero from "@/components/TourCardAll/Hero/Hero";
import Main from "@/components/TourCardAll/Main/Main";

export default function TourCardAll() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      const data = await getByIdTour(id);
      setTour(data);
    };
    fetchTour();
  }, [id]);

  if (!tour) return <div>Загрузка...</div>;

  return (
    <div className="tourCardAllPage">
      <Herader />
      <main>
        <Hero tour={tour} />
        <Main tour={tour} />
      </main>
    </div>
  );
}
