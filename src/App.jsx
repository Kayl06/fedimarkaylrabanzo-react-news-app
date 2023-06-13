/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Routes, Link, Route, useNavigate } from "react-router-dom";
import Menu from "./components/Menu";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NewspeedPage from "./pages/NewsfeedPage";
import ChoosePreferences from "./pages/ChoosePreferences";
import useAuthContext from "./context/AuthContext";
import UserSettings from "./pages/UserSettings";

function App() {
  return (
    <>
      <div className="">
        <nav className="p-[.5rem] bg-gray-900 text-white">
          <Menu />
        </nav>

        <div className="mx-auto w-full">
          <Routes>
            <Route path="/" element={<NewspeedPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/preference" element={<ChoosePreferences />} />
            <Route path="/profile-settings" element={<UserSettings />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
