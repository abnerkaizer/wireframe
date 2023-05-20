import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import "../MovieGrid.css";

const Popular = () => {
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
      <div className="movies-container">
        {upcomingMovies.length === 0 && <p>Carregando...</p>}
        {upcomingMovies.length > 0 &&
          upcomingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Popular;
