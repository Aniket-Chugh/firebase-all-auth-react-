import React, { useState } from "react";
import { doPasswordReset } from "../congif/auth";
import { useAuth } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";

const PasswordResetForm = () => {
    const {userLoggedIn} = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

await doPasswordReset(email).catch(()=>{
    alert("error occured")
})


setMessage("email has been sent and reset your password");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <p className="text-red-600 text-sm"> {message} </p>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
          >
            Send Reset Link
          </button>
          <div>
            <Link to={"/login"}>Go back to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetForm;
