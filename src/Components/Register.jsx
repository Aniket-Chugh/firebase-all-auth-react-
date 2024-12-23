import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../congif/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match!");
        setIsRegistering(false);
        return;
      }

      await doCreateUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log("Registration successful");
        })
        .catch((error) => {
          setIsRegistering(false);
          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("This email is already registered. Please log in.");
          } else {
            setErrorMessage("Something went wrong during registration.");
          }
        });
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
     const data =  await doSignInWithGoogle().catch((error) => {
        alert(error.message);
        setIsRegistering(false);
      });
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="w-96 bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-center text-2xl font-bold text-gray-800">Create a New Account</h3>
          <form onSubmit={onSubmit} className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-bold text-gray-600">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button
              type="submit"
              disabled={isRegistering}
              className={`w-full py-2 mt-2 text-white font-medium rounded-lg ${
                isRegistering ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center justify-center my-4">
            <div className="w-full h-px bg-gray-300"></div>
            <p className="mx-4 text-gray-500">or</p>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

          <button
            onClick={onGoogleSignIn}
            disabled={isRegistering}
            className="flex items-center justify-center w-full px-4 py-2 border rounded-lg shadow-sm hover:shadow-lg transition duration-300 text-white"
          >
            <FcGoogle className="mr-2 text-xl" />
            <span>Sign in with Google</span>
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to={"/login"} className="font-bold text-indigo-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Register with PhoneNumber? {" "}
              <Link to={"/phonelogin"} className="font-bold text-indigo-600 hover:underline">
               Register Now
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
