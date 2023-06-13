import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PreferenceItems from "../components/PreferenceItems";
import useAuthContext from "../context/AuthContext";

function UserSettings() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/signin");
  };
  return (
    <>
      <div className="max-w-[800px] mx-auto py-10 px-5 md:px-0">
        <h1 className="__page-title text-gray-800 font-extrabold text-2xl tracking-wide uppercase">
          Settings
        </h1>
        <span className="text-gray-400 text-sm">
          Setup profile settings and preferences here.
        </span>

        <div className="__content-settings mt-10">
          <div className="__preferences">
            <div className="__label text-gray-800 font-extrabold text-lg tracking-wide uppercase">
              Preferences
            </div>

            <PreferenceItems className="gap-5 mt-5" selected={[1, 2, 3]} />
          </div>

          <div className="__logout mt-20">
            <div className="__label text-gray-800 font-extrabold text-lg tracking-wide uppercase">
              Logout
            </div>

            <div className="mt-5">
              <a
                href="#"
                onClick={handleLogout}
                className="rounded text-red-500 hover:text-red-700 outline outline-1 px-8 py-2 text-sm "
              >
                Logout
              </a>
            </div>

            {/* <Button
              secondary
              className="py-2 mt-5 rounded px-16"
              onClick={handleLogout}
            >
              Logout
            </Button> */}
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default UserSettings;
