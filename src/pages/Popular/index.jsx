import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import "../MovieGrid.css";

const Popular = () => {
  const movieURL = import.meta.env.VITE_API;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [popularMovies, setPopularMovies] = useState([]);
  const getPopularMovies = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setPopularMovies(data.results);
  };
  return <></>;
};

export default Popular;
