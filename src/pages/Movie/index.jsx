import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import "./styles.css";
import MovieCard from "../../components/MovieCard";
import { BiCameraMovie } from "react-icons/bi";

const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const getMovie = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setMovie(data);
  };
  const getTrailer = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    const trailer = data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    setTrailer(trailer);
  };

  useEffect(() => {
    const movieUrl = `${movieURL}${id}?${apiKey}`;
    const trailerUrl = `${movieURL}${id}/videos?${apiKey}`;
    getMovie(movieUrl);
    getTrailer(trailerUrl);
  }, []);
  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  const getGenre = (genres) => {
    const [genre] = genres;
    return genre.name;
  };
  function convertMinutesToHours(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;

    // Format the result as a string
    var result;
    if (hours > 1) {
      result = hours + " Hours ";
    } else if (hours == 1) {
      result = hours + " Hour ";
    } else {
      result = "";
    }
    if (remainingMinutes > 0) {
      result += remainingMinutes + " Minutes";
    }
    return result;
  }

  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} trailer={trailer} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BiCameraMovie /> Genre:
            </h3>
            <p>{getGenre(movie.genres)}</p>
          </div>
          <div className="info"></div>
          <div className="info">
            <h3>
              <BsWallet2 /> Budget:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>

          <div className="info">
            <h3>
              <BsGraphUp /> Revenue:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Runtime
            </h3>
            <p>{convertMinutesToHours(movie.runtime)}</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Overview:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
