/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import useAuthContext from "../context/AuthContext";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const { register } = useAuthContext();

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleRegisterAccount = async (e) => {
    e.preventDefault();

    try {
      register({ name, email, password, password_confirmation });

      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="__sign_in flex lg:flex-row flex-col text-[#2D3748] bg-slate-100">
      <div className="lg:mt-[188px] mt-[50px] lg:w-1/2 w-full justify-center flex flex-row lg:order-2 order-1">
        <div className="flex flex-col 2xl:w-1/2 xl:w-[70%] w-full px-[50px] pb-20">
          <div className="__title text-start flex flex-col justify-center">
            <h1 className="text-[32px] font-[700]">Sign Up</h1>
            <span className="text-[14px] text-[#A0AEC0]">
              Join to the world's largest news website.
            </span>
          </div>

          <form
            className="__form_inputs mt-[36px]"
            onSubmit={handleRegisterAccount}
          >
            <div className="text-start block mb-[24px]">
              <span className="text-[14px] font-[400] mb-[5.5px] text-slate-700">
                Name
              </span>
              <Input
                required
                type="text"
                name="name"
                value={name}
                placeholder="Your Full Name"
                onChange={handleChange(setName)}
                className="px-[20px] py-[15.25px] rounded-[10px]"
                
              />
            </div>

            <div className="text-start block mb-[24px]">
              <span className="text-[14px] font-[400] mb-[5.5px] text-slate-700">
                Email
              </span>
              <Input
                required
                type="email"
                name="email"
                value={email}
                placeholder="Your email address"
                onChange={handleChange(setEmail)}
                className="px-[20px] py-[15.25px] rounded-[10px]"

              />
            </div>

            <div className="text-start block mb-[24px]">
              <span className="text-[14px] font-[400] mb-[5.5px] text-slate-700">
                Password
              </span>
              <Input
                required
                type="password"
                name="password"
                value={password}
                placeholder="Your password"
                onChange={handleChange(setPassword)}
                className="px-[20px] py-[15.25px] rounded-[10px]"

              />
            </div>

            <div className="text-start block mb-[24px]">
              <span className="text-[14px] font-[400] mb-[5.5px] text-slate-700">
                Confirm Password
              </span>
              <Input
                required
                type="password"
                name="password"
                value={password_confirmation}
                placeholder="Confirm Password"
                onChange={handleChange(setPasswordConfirmation)}
                className="px-[20px] py-[15.25px] rounded-[10px]"

              />
            </div>

            <Button
              primary
              className="__signup_btn w-full mt-[36px] mb-[22px] rounded-[12px] justify-center text-[12px] font-[700] uppercase"
            >
              Sign Up
            </Button>
          </form>

          <div className="text-[14px] text-[#A0AEC0] flex justify-center">
            <span className="font-[400]">Already have an account?&nbsp;</span>
            <Link to="/signin" className="text-gray-800 font-[700]">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-auto bg-white __right_bg lg:h-[850px] h-[250px] right-0 lg:w-[862px] w-full flex justify-center items-center lg:order-1 order-1 rounded-none mb-[0]">
        <div className="h-full w-full bg-[url('./assets/undraw_Newspaper_re_syf5.png')] bg-auto bg-no-repeat bg-center"></div>
      </div>
    </div>
  );
}

export default Signup;
