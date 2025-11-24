import React, { useContext, useState } from "react";
import uploadImage from "../../utils/uploadImage";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import AUTH_IMG from "../../assets/Auth.png";

const Signup = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminAccessToken, setAdminAccessToken] = useState("");

  const [error, setError] = useState(null);

  const { updateUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  //Handle Signup Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password . ");
      return;
    }

    setError("");

    //SignUp API Call
    try {
      //Upload image if present
      if (profilePic) {
        const imageUploadsRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadsRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminAccessToken,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        //Redirect based on role
        if (role === "admin") {
          setOpenAuthForm(false);
          navigate("/admin/dashboard");
        }
        navigate("/");
        setOpenAuthForm(false);
      }
    } catch (error) {
      console.log("SIGNUP ERROR => ", error);
      console.log("RESPONSE => ", error.response);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again. ");
        //console.log(error.response.data.message)
      }
    }
  };
  return (
    <div className="flex items-center h-auto md:h-[520px]">
      <div className="w-[90vw] md:w-[43vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your detail below .
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="John@exmple.com"
              type="text"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Charecters"
              type="password"
            />

            <Input
              value={adminAccessToken}
              onChange={({ target }) => setAdminAccessToken(target.value)}
              label="Admin Invite Token"
              placeholder="6 digit Code"
              type="number"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already an account?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => {
                setCurrentPage("login");
              }}
            >
              Login
            </button>
          </p>
        </form>
      </div>
      <div className="hidden md:block">
        <img src={AUTH_IMG} alt="Login" className="h-[520px] w-[33vw]" />
      </div>
    </div>
  );
};

export default Signup;
