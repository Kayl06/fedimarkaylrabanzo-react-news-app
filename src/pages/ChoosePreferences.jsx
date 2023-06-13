/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PreferenceItems from "../components/PreferenceItems";
import useAuthContext from "../context/AuthContext";
import { useRegisterPreferencesMutation } from "../store";
import axios from "../store/apis/axios";

function ChoosePreferences() {
  const [savePreferences, setSavePreferences] = useState([]);
  const [registerPreferences, results] = useRegisterPreferencesMutation();
  const { user, getUser } = useAuthContext();
  const navigate = useNavigate();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const handleSavePrefences = (preferences) => {
    setSavePreferences(preferences);
  };

  const handleSubmitSavedPrefences = async (e) => {
    e.preventDefault();

    if (user) {
      await csrf();

      savePreferences.map((preference) => {
        registerPreferences({
          user_id: user.id,
          preference_name: preference,
        });
      });

      navigate("/");
    }
  };

  return (
    <>
      <div className="text-black max-w-7xl mx-auto p-10 h-full bg-white">
        <h1 className="text-gray-800 font-extrabold text-2xl tracking-wide uppercase">
          What do you want to see?
        </h1>
        <span className="text-gray-500 text-sm">
          Choose any category to get starated
        </span>

        <form onSubmit={handleSubmitSavedPrefences}>
          <div className="flex flex-col justify-between mt-[4em]">
            <PreferenceItems
              className="gap-2 md:gap-10"
              onChange={handleSavePrefences}
            />

            <div className="__save_action flex flex-col justify-center mt-[6em] gap-10">
              <hr className="w-full flex no-flex" />

              <div className="flex justify-center items-center gap-2">
                <Link to="/">
                  <Button
                    secondary
                    className="__skip_button w-[150px] uppercase font-bold tracking-wide cursor-pointer text-gray-500 bg-gray-200 text-[12px] text-center rounded-[15px] items-center flex gap-2 justify-center"
                  >
                    Skip
                  </Button>
                </Link>

                <Button
                  name="submit"
                  className="__submit_button w-[200px] uppercase font-bold tracking-wide cursor-pointer bg-gray-800 text-white text-[12px] text-center rounded-[15px] hover:bg-black hover:text-white items-center flex gap-2 justify-center"
                >
                  Save and continue
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChoosePreferences;
