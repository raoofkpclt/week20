import React, { useState } from "react";
import axiosBaseUrl from "../../axios/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Reduxtoolkit/Reducer";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    handleFrontEndValidation(email, password);
  };

  const handleFrontEndValidation = (email, password) => {
    if (email.trim() === "") {
      toast("Email is required.");
      return;
    }
    if (password.trim() === "") {
      toast("Password is required.");
      return;
    }

    axiosBaseUrl
      .post("/user/postLogin", formData)
      .then((res) => {
        const result = res.data;

        if (Object.prototype.hasOwnProperty.call(result,"error") || result.mission === "failed") {
          toast(result.message);
          navigate("/login");
          return;
        }

        localStorage.setItem("authToken", JSON.stringify(result?.token));
        localStorage.setItem("userData", JSON.stringify(result?.user));
        dispatch(loginSuccess(result.user));
        toast(result.message);
        navigate("/home");
      })
      .catch((err) => {
        console.error("Login error:", err);
        toast(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300">
      <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-md relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-sky-400 opacity-10 rounded-full z-0" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-400 opacity-10 rounded-full z-0" />

        <form onSubmit={handleSubmit} className="relative z-10">
          <h2 className="text-3xl font-bold text-sky-700 text-center mb-6">Welcome</h2>

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-500"
          />

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-semibold transition transform hover:scale-[1.02]"
          >
            Sign In
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-sky-600 underline hover:text-sky-800 transition"
            >
              No Account? Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
