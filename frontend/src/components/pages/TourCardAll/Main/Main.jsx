import "./Main.scss";

import HotelAdvantages from "./HotelAdvantages";
import HotelRooms from "./HotelRooms";
import HotelRating from "./HotelRating";
import HotelLocation from "./HotelLocation";
import HotelBeaches from "./HotelBeaches";
import AboutHotel from "./AboutHotel";
import ForChildren from "./ForChildren";
import HotelFood from "./HotelFood";

export default function Main({
  tour,
  getAverageRating,
  setRoom,
  room,
  food,
  setFood,
  tourist,
}) {
  return (
    <section className="main">
      <div className="container">
        <div className="main__content">
          <HotelAdvantages
            advantages={tour.advantages}
            amenities={tour.amenities}
          />
          <HotelRooms
            rooms={tour.rooms}
            room={room}
            setRoom={setRoom}
            tourist={tourist}
          />
          <HotelRating
            ratingDetails={tour.rating_details}
            getAverageRating={getAverageRating}
          />
          <HotelLocation
            location={{
              location_neighborhood: tour.location_neighborhood,
              location_communication: tour.location_communication,
              distance_airport: tour.distance_airport,
            }}
          />
          <HotelBeaches beaches={tour.beaches || []} />
          <AboutHotel
            general={tour.about_hotel || []}
            sports={tour.sports_entertainment || []}
            pool={tour.pool || []}
            spa={tour.spa || []}
            services={tour.services || []}
            contacts={tour.contacts || []}
          />
          <ForChildren conveniences={tour.for_children || []} />

          <HotelFood
            mealPlans={tour.mealPlans || []}
            selectedFood={food}
            onSelectFood={setFood}
          />
        </div>
      </div>
    </section>
  );
}
