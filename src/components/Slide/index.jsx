import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./styles.css";

const Slide = ({ movie, showLink = true }) => {
  const imageUrl = `${import.meta.env.VITE_IMG}${movie.poster_path}`;

  return (
    <div className="movie-slide">
      <div className="movie-details">
        <h2>{movie.title}</h2>
        <p>
          <FaStar /> {movie.vote_average}
        </p>
      </div>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default Slide;
