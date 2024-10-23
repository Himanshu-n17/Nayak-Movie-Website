import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { APP_URL } from "./context";
import { NavLink } from "react-router-dom";

const MoviePage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState();

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      getMovies(`${APP_URL}&i=${id}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <div className="loading">
          Please Use Fast Internet Connection <br />
          <br />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="descripion">
        <div className="movie-card">
          <figure>
            <img src={movie.Poster} alt={movie.Title} />
          </figure>
          <div className="card-content">
            <p className="title">
              <b>{movie.Title}</b>
            </p>
            <p className="card-text">
              <b>CAST : </b> {movie.Actors}
            </p>
            <p className="card-text">
              <b>Genre : </b>
              {movie.Genre}
            </p>
            <p className="card-text">
              <b>IMDB : </b>
              {movie.imdbRating} / 10
            </p>
            <p className="card-text">
              <b>Duration : </b>
              {movie.Runtime}
            </p>
            <p className="card-text">
              <b>Released : </b>
              {movie.Released}
            </p>
            <p className="card-text">
              <b>Origin : </b>
              {movie.Country}
            </p>
            <p className="card-text">
              <b>Description : </b>
              {movie.Plot}
            </p>
          </div>
        </div>
        <NavLink to="/" className="back-btn">
          Go Back
        </NavLink>
      </section>
    </>
  );
};

export default MoviePage;
