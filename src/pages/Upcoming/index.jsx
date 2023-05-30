import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./styles.css";

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
        style={{ "--swiper-pagination-bullet-inactive-color": "#999999" }}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        keyboard
        loop
        pagination={{ clickable: true }}
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
