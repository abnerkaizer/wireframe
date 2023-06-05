import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import YouTubeVideo from "../YouTubeVideo";
const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true, trailer }) => {
  return (
    <div className="movie-card">
      {trailer ? (
        <YouTubeVideo videoId={trailer.key} />
      ) : (
        <img src={imageUrl + movie.poster_path} alt={movie.title} />
      )}
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
      {showLink && <Link to={`/wireframe/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
