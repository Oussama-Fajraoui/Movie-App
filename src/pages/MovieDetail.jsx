import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FsLightbox from "fslightbox-react";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState("");
  const [toggler, setToggler] = useState(false);
  const [videoID, setVideoID] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    title,
    poster_path,
    overview,
    vote_average,
    vote_count,
    release_date,
    homepage,
    runtime,
    tagline,
    spoken_languages,
    genres,
  } = movieDetail;

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  const imageAPI = `https://image.tmdb.org/t/p/w1280${poster_path}`;
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;

  const videoLightBoxShow = videoID
    ? `https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1`
    : `https://assets.b9.com.br/wp-content/uploads/2018/10/youtube_fail.jpg`;

  const getMovieDetail = async () => {
    try {
      const { data } = await axios(url);
      setMovieDetail(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMovieVideo = async () => {
    try {
      const { data } = await axios(videoUrl);
      setVideoID(data.results[0].key);
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log(movieDetail);
  console.log(videoID);

  useEffect(() => {
    getMovieDetail();
    getMovieVideo();
  }, []);

  return (
    <>
      <div className="h-[75px]"></div>
      <div className="container px-10 mx-auto py-5 h-screen">
        <h1 className="text-center dark:text-white text-3xl">{title}</h1>
        <h1>
          <h1 className="text-center dark:text-white  text-xl mt-1">
            {tagline}
          </h1>
        </h1>
        <div className="container flex justify-center px-10">
          <div className="flex flex-col lg:flex-row max-w-6xl rounded-lg shadow-lg    bg-white dark:bg-gray-900">
            <img
              className=" lg:w-1/3 h-96 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
              src={poster_path ? imageAPI : defaultImage}
              alt="poster"
            />
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h5 className="dark:text-white  text-xl font-medium mb-2">
                  Overview
                </h5>

                <p className="text-gray-700 dark:text-white  text-base mb-4">
                  {overview}
                </p>
              </div>
              <ul className="bg-gray-100 rounded-lg border border-gray-400 text-gray-900">
                <li className="px-6 py-2 border-b border-gray-400 w-full rounded-t-lg">
                  <b> Release Date : </b>
                  {release_date}
                </li>
                <li className="px-6 py-2 border-b border-gray-400 w-full">
                  <b> Rate : </b>
                  {vote_average}
                </li>
                <li className="px-6 py-2 border-b border-gray-400 w-full">
                  <b> Total Vote : </b>
                  {vote_count}
                </li>
                <li className="px-6 py-2 border-b border-gray-400 w-full">
                  <b> Genre : </b>
                  {genres?.map((item) => (
                    <span>{item.name} </span>
                  ))}
                </li>
                <li className="px-6 py-2 border-b border-gray-400 w-full">
                  <b> Runtime : </b>
                  {runtime} min.
                </li>
                <li className="px-6 py-2 border-b border-gray-400 w-full">
                  <b> Language : </b>
                  {spoken_languages?.map((item) => (
                    <span>{item.name} </span>
                  ))}
                </li>

                <li className="px-6 py-2 border-gray-400 w-full rounded-t-lg">
                  <button
                    type="button"
                    className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 transition-all"
                    onClick={() => navigate(-1)}>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                    Go Back
                  </button>
                  <button
                    type="button"
                    className="text-yellow-700 border border-yellow-700 hover:bg-yellow-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-yellow-500 dark:text-yellow-500 dark:hover:text-white dark:focus:ring-yellow-800 transition-all"
                    onClick={() => navigate("/similar", { state: id })}>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                    Get Similar Movies
                  </button>
                  <button
                    type="button"
                    className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 transition-all"
                    onClick={() => window.location.replace(homepage)}>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                    Go to Movie Homepage
                  </button>
                  <button
                    onClick={() => setToggler(!toggler)}
                    type="button"
                    className="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 transition-all">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                    Watch Trailer
                  </button>
                  <FsLightbox
                    toggler={toggler}
                    sources={[`${videoLightBoxShow}`]}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
