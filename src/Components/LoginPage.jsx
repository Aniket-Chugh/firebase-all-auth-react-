import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword , doSignInWithGoogle} from '../congif/auth';
import { useAuth } from '../context/authContext';
import { FcGoogle } from "react-icons/fc";


const LoginPage = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn , setIsSigningIn] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
          setIsSigningIn(true);
          try {
            await doSignInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log('Error:', error); // Debugging
            setIsSigningIn(false);
            if (error.code === "auth/invalid-credential") {
              setError("Password/email is incorrect. Please try again.");
            } else if (error.code === "auth/user-not-found") {
              setError("No user found with this email.");
            } else {
              setError("Something went wrong during login. Please try again.");
            }
          }
        }
      };

      const onGoogleSignIn = async (e) =>{
      e.preventDefault();
      if (!isSigningIn) {
          setIsSigningIn(true);
          await doSignInWithGoogle().catch((error)=>{
              alert(error);
          })
      }
      }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSigningIn}
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >


              {isSigningIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center justify-center flex-col">
                                  <div className="mb-3">
                                      <p>-------- or ---------</p>
                                  </div>
                                  <div >
                                      <button onClick={onGoogleSignIn} className="text-white mb-3">
                                          <div className="flex items gap-3 justify-center">

                                              <div className="mt-1"><FcGoogle /> </div>
                                              <div>sign in with google</div>
                                          </div>

                                      </button>
                                  </div>
                              </div>


            <div className='flex items-center text-sm gap-5'>
                <div >

                <span>No Account ? </span>
                <span>
                <Link to={"/register"}>Register Now !</Link>
                </span>
                </div>
                <div>
                    <span>
                       <Link to={"/reset"}>Forgot Password ? </Link>
                    </span>
                </div>
            </div>
        </div>
      </div>
    );
  };

  export default LoginPage;
