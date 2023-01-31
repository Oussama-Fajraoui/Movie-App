import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { logOut } from "../auth/firebase";
import defaultAvatar from "../assets/avatar.png";
import navbarLogo from "../assets/navbar-logo.png";
import Switch from "./Switch";

const NavbarComp = () => {
  const { userContext } = useAuthContext();

  return (
    <>
      <nav className="w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-emerald-900 shadow-lg navbar navbar-expand-lg fixed-top dark:bg-gray-900 dark:text-white">
        <div className="container-fluid w-full flex items-center justify-between px-6">
          <Link
            className="text-2xl  pr-2 font-semibold flex items-center gap-3"
            to="/">
            <img
              src={navbarLogo}
              alt="navbar-logo"
              width="70px"
              className="hidden md:inline"
            />
            Movie Heaven
            <small className="hidden md:inline text-sm">Oussama Fajraoui</small>
          </Link>

          <div>
            <ul className="hidden lg:flex px-3 mx-auto font-semibold font-heading space-x-12">
              <li>
                <Link className="hover:text-gray-400" to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link className="hover:text-gray-400" to="/toprated">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-400" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center relative">
            {userContext && (
              <h5 className="mr-2 capitalize">{userContext?.displayName}</h5>
            )}
            <Switch />
            <div className="dropdown relative">
              <span
                className="dropdown-toggle flex items-center hidden-arrow"
                id="dropdownMenuButton2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <img
                  src={userContext?.photoURL || defaultAvatar}
                  className="rounded-full"
                  style={{ height: 25, width: 25 }}
                  alt="user"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </span>
              <ul
                className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                aria-labelledby="dropdownMenuButton2">
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/register">
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <span
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    role="button"
                    onClick={() => logOut()}>
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarComp;
