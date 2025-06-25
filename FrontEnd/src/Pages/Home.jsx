import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Reduxtoolkit/Reducer";

const HomePage = () => {
  const [userCache, setUserCache] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const userLocal = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (userLocal) {
      setUserCache(userLocal);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const imageFileName =
    user?.image?.data?.data
      ? String.fromCharCode(...user.image.data.data)
      : userLocal?.image?.data?.data
      ? String.fromCharCode(...userLocal.image.data.data)
      : null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300 relative">
      {/* Decorative Circles */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-sky-300 opacity-10 rounded-full z-0" />
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-sky-400 opacity-10 rounded-full z-0" />

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center relative z-10">
        <h1 className="text-3xl font-bold text-sky-700 mb-4">Home Page</h1>

        <div className="mb-5">
          {imageFileName ? (
            <img
              src={`http://localhost:3033/uploads/${imageFileName}`}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full shadow-md object-cover border-4 border-sky-200"
            />
          ) : (
            <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 flex items-center justify-center text-gray-600 shadow-md mb-4">
              No Image
            </div>
          )}
        </div>

        <p className="text-lg text-gray-700 mb-2">
          Welcome, <strong>{user?.name || userCache?.name || "User"}!</strong>
        </p>
        <p className="text-gray-600 mb-6">
          You're now on the home page. Choose an option below:
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="w-1/2 bg-sky-500 text-white py-2 rounded-full hover:bg-sky-600 transition"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-1/2 border border-sky-500 text-sky-700 py-2 rounded-full hover:bg-sky-50 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
