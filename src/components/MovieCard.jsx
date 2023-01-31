import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";

const MovieCard = ({ poster_path, title, overview, vote_average, id }) => {
  const { userContext } = useAuthContext();
  const navigate = useNavigate();

  const imageAPI = `https://image.tmdb.org/t/p/w1280${poster_path}`;
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

  const getVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };
  return (
    <div
      className={`movie ${
        userContext ? getVoteClass(vote_average) : "bg-black pb-4"
      }`}
      onClick={() => {
        navigate("/details/" + id);
        !userContext && toastWarnNotify("Please login to see details");
      }}>
      <h1 className="text-lg text-center text-bold detailsText text-white bg-green-800 ">
        Click to Details
      </h1>
      <div className="overflow-hidden">
        <img
          loading="lazy"
          src={poster_path ? imageAPI : defaultImage}
          alt="movie-card"
          className="hover:scale-110 transition-all "
        />
      </div>
      <div className="flex items-center justify-between p-1 text-white">
        <h5>{title}</h5>
        {userContext && (
          <span className={`tag ${getVoteClass(vote_average)} text-lg`}>
            {vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className="movie-over">
        <h2 className="font-bold text-lg ">Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
