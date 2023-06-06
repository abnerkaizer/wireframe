import { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import "../MovieGrid.css";

const Popular = () => {
  const movieURL = import.meta.env.VITE_API;
  const apiKey = import.meta.env.VITE_API_KEY;
  const genreURL = import.meta.env.VITE_GENRE;
  const token = import.meta.env.VITE_TOKEN;

  const [popularMovies, setPopularMovies] = useState([]);
  const [originalPopularMovies, setOriginalPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);

  const getGenres = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGenres(); // Call getGenres function here
  }, []);

  const getPopularMovies = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setPopularMovies(data.results);
    setOriginalPopularMovies(data.results);
    setIsLoading(false);
  };
  useEffect(() => {
    const popularUrl = `${movieURL}popular?${apiKey}&page=${page}`;
    getPopularMovies(popularUrl);
  }, [isLoading]);
  const getNewPopularMovies = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setPopularMovies((movies) => [...movies, ...data.results]);
    setOriginalPopularMovies((movies) => [...movies, ...data.results]);
    if (selectedOption) {
      const filteredMovies = originalPopularMovies.filter((movie) =>
        movie.genre_ids.includes(selectedOption)
      );
      setPopularMovies(filteredMovies);
    } else {
      setPopularMovies(originalPopularMovies);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    const popularUrl = `${movieURL}popular?${apiKey}&page=${page}`;
    getNewPopularMovies(popularUrl);
  }, [page]);

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    setSelectedOption(value);
  };
  useEffect(() => {
    if (selectedOption) {
      const filteredMovies = originalPopularMovies.filter((movie) =>
        movie.genre_ids.includes(selectedOption)
      );
      setPopularMovies(filteredMovies);
    } else {
      setPopularMovies(originalPopularMovies);
    }
  }, [selectedOption]);

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (!isLoading && scrolledToBottom) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="container">
      <h2 className="title">Popular: </h2>
      <select defaultValue="Select a genre" onChange={handleChange}>
        <option disabled>Select a genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <div className="movies-container">
        {isLoading && <p>Loading...</p>}
        {!isLoading && popularMovies.length === 0 && (
          <p>No movies with this genre.</p>
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
