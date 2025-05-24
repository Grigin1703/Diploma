import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocalStorageWithExpiry } from "@/utils/useLocalStorageWithExpiry";
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
  
  const [room, setRoom] = useLocalStorageWithExpiry("room", "Comfort room");
  const [food, setFood] = useLocalStorageWithExpiry("food", "Только завтраки");
  const [days, setDays] = useLocalStorageWithExpiry("days", 6);
  const [tourists, setTourists] = useLocalStorageWithExpiry("tourists", 1);

  useEffect(() => {
    const fetchTour = async () => {
      const data = await getByIdTour(id);
      setTour(data);
    };
    fetchTour();
  }, [id]);

  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, item) => acc + item.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };

  if (!tour) return <div>Загрузка...</div>;

  return (
    <div className="tourCardAllPage">
      <Herader />
      <main>
        <Hero tour={tour} getAverageRating={getAverageRating} />
        <Main
          tour={tour}
          getAverageRating={getAverageRating}
          setRoom={setRoom}
          room={room}
          food={food}
          setFood={setFood}
          tourist={tourists}
          setTourist={setTourists}
        />
        <TourForm
          pricesByDuration={tour.pricesByDuration}
          rooms={tour.rooms}
          foods={tour.mealPlans}
          openModal={() => setIsModalOpen(true)}
          room={room}
          setRoom={setRoom}
          food={food}
          setFood={setFood}
          days={days}
          setDays={setDays}
          tourist={tourists}
          setTourist={setTourists}
        />
      </main>
      <OrderModal
        tour={tour}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
