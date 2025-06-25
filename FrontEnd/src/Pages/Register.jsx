import React, { useState } from "react";
import axiosBaseUrl from "../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (name === "image") {
      const file = files[0];
      if (!file) return;
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, image } = formData;

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast("Please fill all fields.");
      return;
    }

    const imageForm = new FormData();
    imageForm.append("name", name);
    imageForm.append("email", email);
    imageForm.append("password", password);
    imageForm.append("image", image);

    axiosBaseUrl
      .post(`/user/register`, imageForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const result = res.data;

        if (result.error) {
          toast(result.error);
          return;
        }

        localStorage.setItem("userData", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);

        toast("User registered successfully!");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Registration error:", err);
        toast("Something went wrong. Try again.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300">
      <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-md relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-sky-400 opacity-10 rounded-full z-0" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-400 opacity-10 rounded-full z-0" />

        <form onSubmit={handleSubmit} className="relative z-10">
          <h2 className="text-3xl font-bold text-sky-700 text-center mb-6">Register</h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-500"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 bg-gray-100 rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
          />

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-semibold transition transform hover:scale-[1.02]"
          >
            Register
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sky-600 underline hover:text-sky-800 transition"
            >
              Have an account? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
