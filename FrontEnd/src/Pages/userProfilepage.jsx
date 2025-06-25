import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosBaseUrl from "../../axios/axiosConfig";
import { loginSuccess } from "../../Reduxtoolkit/Reducer";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [changeImage, setChangeImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const imagePathRef = useRef("");
  const changeImageRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("userData"));
    if (userLocal) {
      setUser(userLocal);
      if (userLocal.image?.data?.data) {
        imagePathRef.current = String.fromCharCode(...userLocal.image.data.data);
      }
    }
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    const file = changeImageRef.current?.files?.[0];
    if (!file || !user?.email) return;

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("email", user.email);

      const response = await axiosBaseUrl.post(
        "/user/home/profilePage/changeImage",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const result = response.data;
      if (result?.error) {
        console.error(result.error);
        return;
      }

      dispatch(loginSuccess(result.user));
      localStorage.setItem("userData", JSON.stringify(result.user));
      setUser(result.user);

      if (result.data) {
        imagePathRef.current = result.data;
        setPreviewImage(null);
        setChangeImage(false);
      }
    } catch (err) {
      console.error("Error uploading image:", err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center relative">
        {/* Decorative Circles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-sky-300 opacity-10 rounded-full z-0" />
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-sky-400 opacity-10 rounded-full z-0" />

        {user ? (
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-sky-700 mb-4">User Profile</h1>

            <div className="mb-5">
              <img
                src={
                  previewImage ||
                  `http://localhost:3033/uploads/${imagePathRef.current}`
                }
                alt="Profile"
                className="w-32 h-32 mx-auto rounded-full shadow-md object-cover border-4 border-sky-200"
              />
            </div>

            {changeImage ? (
              <div className="mb-4">
                <input
                  type="file"
                  ref={changeImageRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="w-full px-4 py-2 rounded-full bg-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
                />
                <button
                  onClick={handleImageUpload}
                  className="mt-3 w-full py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition"
                >
                  Save Image
                </button>
              </div>
            ) : (
              <button
                onClick={() => setChangeImage(true)}
                className="mb-5 w-full py-2 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition"
              >
                Change Image
              </button>
            )}

            <div className="text-left text-gray-700 space-y-2 px-2">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>

            <button
              onClick={() => navigate("/home")}
              className="mt-6 inline-block underline text-sky-700 hover:text-sky-900"
            >
              ← Back to Home
            </button>
          </div>
        ) : (
          <p className="text-gray-600 z-10">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
