import { Link } from "react-router-dom";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import useAuthContext from "../context/AuthContext";
import Button from "./Button";
import { useState } from "react";

function Menu() {
  const { user } = useAuthContext();
  const [toggleMenu, setToggleMenu] = useState(false);

  const isLoggedIn = user;

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  function RenderedMenuItems() {
    return (
      <>
        <ul
          className="
            mt-0
            flex flex-col
            text-center
            rounded-lg
            p-2
            space-y-6
            lg:space-y-0
            md:flex-row md:space-x-8 md:text-sm md:font-medium
          "
        >
          <li>
            <Link
              to="/"
              className="block rounded pr-4 pl-3 hover:text-gray-300"
              onClick={handleToggleMenu}
            >
              Newsfeed
            </Link>
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <Link
                  to="/signin"
                  className="block rounded pr-4 pl-3 hover:text-gray-300"
                  onClick={handleToggleMenu}
                >
                  Signin
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block rounded pr-4 pl-3 hover:text-gray-300"
                  onClick={handleToggleMenu}
                >
                  Signup
                </Link>
              </li>
            </>
          )}

          {isLoggedIn && (
            <li>
              <Link
                to="/profile-settings"
                className="block rounded hover:text-gray-300"
                onClick={handleToggleMenu}
              >
                Profile
              </Link>
            </li>
          )}
        </ul>
      </>
    );
  }

  return (
    <div className="container mx-auto flex flex-wrap items-center justify-between">
      <div className=" font-semibold tracking-wide uppercase">
        <a className="text-xl" href="/">
          NewsHub
        </a>
      </div>

      <div className="hidden w-full md:block md:w-auto">
        <RenderedMenuItems />
      </div>

      {toggleMenu ? (
        <div className="flex md:hidden">
          <div className="flex py-5">
            <Button className="py-0 h-auto" onClick={handleToggleMenu}>
              <RiCloseFill className="text-[1.6em]" />
            </Button>
          </div>
          <div className="absolute h-1/4 rounded-b-lg top-[80px] right-0 w-full z-10 bg-gray-900 shadow-lg">
            <div className="__menu_items flex flex-col">
              <div className="flex justify-center">
                <RenderedMenuItems />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button className="flex md:hidden py-5 h-auto" onClick={handleToggleMenu}>
          <RiMenu3Fill className="text-[1.6em]" />
        </Button>
      )}
    </div>
  );
}

export default Menu;
