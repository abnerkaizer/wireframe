import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import "../MovieGrid.css";

const Popular = () => {
  const movieURL = import.meta.env.VITE_API;
  const apiKey = import.meta.env.VITE_API_KEY;
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];
  const [popularMovies, setPopularMovies] = useState([]);
  const getPopularMovies = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setPopularMovies(data.results);
  };
  useEffect(() => {
    const popularUrl = `${movieURL}popular?${apiKey}`;
    getPopularMovies(popularUrl);
  }, []);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setSelectedOption(value);
  };
  useEffect(() => {
    console.log(selectedOption);
    setPopularMovies(
      popularMovies.filter((movie) => selectedOption === movie.genre)
    );
  }, [selectedOption]);
  return (
    <div className="container">
      <div className="top">
        <h2></h2>
        <h2></h2>
        <h2 className="title">Destaques: </h2>
        <select defaultValue="Selecione uma opção" onChange={handleChange}>
          <option disabled>Selecione uma opção</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="movies-container">
        {popularMovies.length === 0 && <p>Carregando...</p>}
        {popularMovies.length > 0 &&
          popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Popular;
