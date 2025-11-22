import React from "react";
import { useContext, useState } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

//import AUTH_IMG from '../../assets/'

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  //Handle Login Form Submit

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center">
      <div className="w-[90vw]  md:w-[33vw] p-7 flex flex-col justify-center">
        <h3 className=" text-lg font-semibold text-black ">Welcome Back</h3>
        <p className=" text-xs text-slate-700 mt-[0.5] mb-6  ">Please enter your details to log in</p>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-xs pb-2.5 ">{error}</p>}
          <button type="submit" className="btn-">
            LOGIN
          </button>

          <p className="">
            Don't have an account? {""}
            <button
              className=""
              onClick={() => {
                setCurrentPage("signup");
              }}
            >
              SignUp
            </button>
          </p>
        </form>
      </div>

      <div className="">
        <img src={AUTH_IMG} alt="Login" className="" />
      </div>
    </div>
  );
};

export default Login;
