import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const TopRated = () => {
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! HOOKS
  const [movieData, setMovieData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! URL and GLOBAL DATA
  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${pageNumber}`;

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! GET MOVIE DATA
  const getPopularMovie = async () => {
    try {
      setLoading(true);
      const { data } = await axios(url);
      setMovieData(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! USE EFFECT
  useEffect(() => {
    getPopularMovie();
  }, [pageNumber]);

  return (
    <div className="h-full">
      <div className="h-[75px]"></div>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          movieData.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
      <div className="flex flex-row space-x-2 justify-center items-center gap-3 pt-5 pb-9">
        <button
          type="button"
          className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 rotate-180"
          onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
        <p className="text-3xl border-solid dark:text-lime-50">{pageNumber}</p>
        <button
          type="button"
          className="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white  dark:focus:ring-green-800"
          onClick={() => setPageNumber(pageNumber + 1)}>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopRated;
