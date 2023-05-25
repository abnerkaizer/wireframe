import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import "../MovieGrid.css";

const Popular = () => {
  const movieURL = import.meta.env.VITE_API;
  const apiKey = import.meta.env.VITE_API_KEY;
  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  const [popularMovies, setPopularMovies] = useState([]);
  const [originalPopularMovies, setOriginalPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPopularMovies = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setPopularMovies(data.results);
    setOriginalPopularMovies(data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    const popularUrl = `${movieURL}popular?${apiKey}`;
    getPopularMovies(popularUrl);
  }, []);
  const [selectedOption, setSelectedOption] = useState(Number);

  const handleChange = (event) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    setSelectedOption(value);
  };
  useEffect(() => {
    console.log(selectedOption);
    if (selectedOption) {
      const filteredMovies = originalPopularMovies.filter((movie) =>
        movie.genre_ids.includes(selectedOption)
      );
      setPopularMovies(filteredMovies);
    } else {
      setPopularMovies(originalPopularMovies);
    }
  }, [selectedOption]);

  return (
    <div className="container">
      <h2 className="title">Destaques: </h2>
      <select defaultValue="Selecione uma opção" onChange={handleChange}>
        <option disabled>Selecione uma opção</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <div className="movies-container">
        {isLoading && <p>Carregando...</p>}
        {!isLoading && popularMovies.length === 0 && (
          <p>Não há filmes desse gênero.</p>
        )}
        {!isLoading &&
          popularMovies.length > 0 &&
          popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Popular;
