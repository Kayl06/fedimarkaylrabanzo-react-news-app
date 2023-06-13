/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../store/apis/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await axios.get("/api/user");
    setUser(data);
  };

  const signIn = async ({ ...data }) => {
    try {
      await csrf();
      await axios.post(`/login`, data);
      await getUser();

      navigate("/");
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const register = async ({ ...data }) => {
    try {
      await csrf();
      await axios.post(`/register`, data);
      await getUser();

      navigate("/signin");
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const logout = () => {
    axios.post(`/logout`).then(() => {
      setUser(null);
    });
  };

  const updateFirstLogin = async (user_id) => {
    try {
      await csrf();
      await axios.post(`api/user/update-first-login`, { user_id });
      await getUser();
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, errors, getUser, signIn, register, logout, updateFirstLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
