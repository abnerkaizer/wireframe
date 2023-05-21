import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import "../MovieGrid.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Upcoming = () => {
  const movieURL = import.meta.env.VITE_API;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const getUpcomingMovies = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setUpcomingMovies(data.results);
  };
  useEffect(() => {
    const upcomingUrl = `${movieURL}upcoming?${apiKey}`;
    getUpcomingMovies(upcomingUrl);
  }, []);
  return (
    <div className="container">
      <h2 className="title">Lançamentos: </h2>
      <Swiper
        spaceBetween={100}
        slidesPerView={3}
        navigation
        keyboard
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <div className="movies-container">
          {upcomingMovies.length === 0 && <p>Carregando...</p>}
          {upcomingMovies.length > 0 &&
            upcomingMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard key={movie.id} movie={movie} />
              </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Upcoming;
