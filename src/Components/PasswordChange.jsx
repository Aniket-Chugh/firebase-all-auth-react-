import React, { useState } from "react";
import { doPasswordChange } from "../congif/auth";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const PasswordChangePage = () => {
  const { userLoggedIn } = useAuth(); // To check if the user is logged in
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setIsChangingPassword(true);
    setMessage("");

    try {
      await doPasswordChange(newPassword);
      setMessage("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage(error.message || "An error occurred while changing the password.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <>
      {!userLoggedIn && <Navigate to={"/login"} replace={true} />} {/* Redirect if not logged in */}
      <main className="w-full h-screen flex self-center place-content-center place-items-center">
        <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center mb-6">
            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">
              Change Your Password
            </h3>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 font-bold">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-bold">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>
            {message && (
              <div
                className={`text-center text-sm font-bold ${
                  message.includes("successfully") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </div>
            )}
            <button
              type="submit"
              disabled={isChangingPassword}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                isChangingPassword
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
              }`}
            >
              {isChangingPassword ? "Updating Password..." : "Change Password"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default PasswordChangePage;
