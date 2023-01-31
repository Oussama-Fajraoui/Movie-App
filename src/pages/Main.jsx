import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useAuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";
import "../styles/Main.css";

const Main = () => {
  // console.log(process.env.REACT_APP_MOVIE_API_KEY);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! HOOKS
  const [movieData, setMovieData] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CONTEXT API
  const { userContext } = useAuthContext();

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! URL and GLOBAL DATA
  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNumber}`;
  const urlNewMovie = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchMovie}`;

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! GET MOVIE DATA
  const getData = async () => {
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

  console.log(movieData);

  const getNewMovie = async () => {
    const { data } = await axios(urlNewMovie);
    setMovieData(data.results);
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! USE EFFECT
  useEffect(() => {
    getData();
  }, [pageNumber]);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! SEARCH CONTROL
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchMovie && userContext) {
      getNewMovie();
      setSearchMovie("");
    } else if (!userContext) {
      toastWarnNotify("Please login to see details");
    } else {
      toastWarnNotify("Please enter a text");
    }
  };

  return (
    <div className="h-full">
      <div className="h-[75px]"></div>
      <form className="flex justify-center p-2 pt-5" onSubmit={handleSubmit}>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
          Search
        </label>
        <div class="relative pt-1">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class=" p-4 pl-10  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96"
            placeholder="Search Movies..."
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button>
          <div className="absolute top-0 left-0 w-full h-1 flex ">
            <div className="h-2 bg-blue-500 flex-1 "></div>
            <div className="h-2 bg-red-500 flex-1"></div>
            <div className="h-2 bg-yellow-500 flex-1"></div>
            <div className="h-2 bg-blue-500 flex-1"></div>
            <div className="h-2 bg-green-500 flex-1"></div>
            <div className="h-2 bg-red-500 flex-1 "></div>
          </div>
        </div>
      </form>
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

export default Main;
