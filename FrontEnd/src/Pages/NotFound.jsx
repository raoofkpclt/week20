// NotFound.jsx
import React from 'react';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg relative overflow-hidden text-center">
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-sky-400 opacity-10 rounded-full z-0" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-400 opacity-10 rounded-full z-0" />

        <div className="relative z-10 space-y-6">
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-100">404</h1>
            <h1 className="absolute top-0 left-0 right-0 text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse">
              404
            </h1>
          </div>

          <h2 className="text-2xl font-semibold text-sky-700">Oops! Page not found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          <button
            onClick={() => navigate('/home')}
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold rounded-full transition-transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <span className="flex items-center gap-2 z-10 relative">
              <Home className="w-5 h-5 group-hover:animate-bounce" />
              Take Me Home
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
