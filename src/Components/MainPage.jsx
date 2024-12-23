import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { doSignOut } from "../congif/auth";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (!isSigningOut) {
      setIsSigningOut(true);
      await doSignOut().catch(() => {
        alert("Error occurred during sign out.");
      });
    }
  };

  const handleChangePassword = () => {
    navigate("/changepass");
  };

  if (!userLoggedIn) {
    navigate("/login");
    return null;
  }

  const username = currentUser?.email.split('@')[0];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 ">
      <div className="h-[60vh] bg-white rounded-lg shadow-2xl p-8 w-fit">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 mb-4">
            <img
              className="rounded-full border-4 border-indigo-500 shadow-lg"
              src= {currentUser?.photoURL || "https://img.freepik.com/free-vector/flat-style-woman-avatar_90220-2944.jpg?semt=ais_hybrid"}
              alt="profile photo"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentUser?.displayName || `${username}`}
          </h2>
          <p className="text-lg text-gray-600">{currentUser?.email || "Email"}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-evenly">
          <button
            onClick={handleSignOut}
            className="px-6 py-2 bg-red-500 text-white font-medium rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
          >
            {isSigningOut ? "Signing Out..." : "Log Out"}
          </button>
          <button
            onClick={handleChangePassword}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
