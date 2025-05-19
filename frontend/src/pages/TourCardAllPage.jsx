import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getByIdTour } from "@/api/tours.js";
import Herader from "@/components/HeaderWithMenu/HeaderWithMenu";
import Hero from "@/components/TourCardAll/Hero/Hero";
import Main from "@/components/TourCardAll/Main/Main";
import OrderModal from "@/components/Order/Modal/Modal";
import TourForm from "@/components/TourCardAll/TourCardForm/TourCardForm";

export default function TourCardAll() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <TourForm
          pricesByDuration={tour.pricesByDuration}
          rooms={tour.rooms}
          foods={tour.mealPlans}
          openModal={() => setIsModalOpen(true)}
        />
        <Main tour={tour} />
        <OrderModal tour={tour} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
      </main>
    </div>
  );
}
