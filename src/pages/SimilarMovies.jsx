import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../styles/Main.css";

const SimilarMovies = () => {
  const { state: id } = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [similarMovie, setSimilarMovie] = useState([]);

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`;

  const getSimilarMovie = async () => {
    try {
      setLoading(true);
      const { data } = await axios(url);
      setSimilarMovie(data.results);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSimilarMovie();
  }, []);

  console.log(similarMovie);
  return (
    <>
      <div className="h-[75px]"></div>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          similarMovie.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
    </>
  );
};

export default SimilarMovies;
