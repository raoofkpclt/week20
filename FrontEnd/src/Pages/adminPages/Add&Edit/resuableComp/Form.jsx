import React, { useState } from 'react';
import axiosBaseUrl from '../../../../../axios/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Form = ({
  lastArg,
  heading,
  buttonText,
  editData = {},
  editableFields = ['name', 'email', 'password', 'image'], // allow all by default
}) => {
  const [formData, setFormData] = useState({
    name: editData.name || '',
    email: editData.email || '',
    password: editData.password || '',
    image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (!file) return;
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleValidationAndSubmit = () => {
    const { name, email, password } = formData;
    if (editableFields.includes('name') && !name.trim()) return alert('Name is required');
    if (editableFields.includes('email') && !email.trim()) return alert('Email is required');
    if (editableFields.includes('password') && !password.trim()) return alert('Password is required');

    const formPayload = new FormData();
    if (editableFields.includes('name')) formPayload.append('name', name);
    if (editableFields.includes('email')) formPayload.append('email', email);
    if (editableFields.includes('password')) formPayload.append('password', password);
    if (editableFields.includes('image') && formData.image) formPayload.append('image', formData.image);
    if (editData._id) formPayload.append('id', editData._id);

    axiosBaseUrl
      .post(`/admin/${lastArg}`, formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res.data?.error) {
          alert(res.data.error);
        } else {
          toast('User saved successfully!');
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        console.error('Error submitting form:', err.message);
        toast('Something went wrong. Please try again.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidationAndSubmit();
  };

  const isEditable = (field) => editableFields.includes(field);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-28 h-28 bg-blue-300 rounded-full opacity-10"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sky-400 rounded-full opacity-10"></div>

        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6 relative z-10">{heading}</h2>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {/* Name */}
          {isEditable('name') && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter name"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>
          )}

          {/* Email */}
          {isEditable('email') && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>
          )}

          {/* Password */}
          {isEditable('password') && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>
          )}

          {/* Image Upload */}
          {isEditable('image') && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Profile Picture</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            {lastArg === 'edit' && (
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
