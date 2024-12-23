import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Our Platform</h1>
      <p className="text-lg text-gray-600 mb-8">Join us today or log in to your account.</p>
      <div className="space-x-4">
        <button
          className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={()=>{
navigate("/register")
          }}
        >
          Register
        </button>
        <button
          className="px-6 py-3 text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg shadow focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={()=>{
            navigate("/login")
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default HomePage;
