import { useState, useEffect } from "react";
import Slide from "../../components/Slide";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.css";

const Upcoming = () => {
  const movieURL = import.meta.env.VITE_API;
  const apiKey = import.meta.env.VITE_API_KEY;
  const imageUrlPrefix = import.meta.env.VITE_IMG; // Image URL prefix
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const getUpcomingMovies = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    const moviesWithImages = data.results.map((movie) => ({
      ...movie,
      imageUrl: `${imageUrlPrefix}${movie.poster_path}`, // Construct the image URL
    }));
    setUpcomingMovies(moviesWithImages);
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
        {upcomingMovies.length > 0 && (
          <Carousel
            className="custom-carousel"
            style={{ width: "1000px" }}
            showArrows={true}
            infiniteLoop={true}
            autoPlay={false}
            showThumbs={false}
          >
            {upcomingMovies.map((movie) => (
              <div key={movie.id}>
                <img src={movie.imageUrl} alt={movie.title} />{" "}
                {/* Display the thumbnail image */}
                <Slide movie={movie} />
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Upcoming;
