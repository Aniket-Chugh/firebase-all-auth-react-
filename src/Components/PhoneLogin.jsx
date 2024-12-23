import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { auth } from '../congif/firebase.config'; // Firebase config import

const PhoneLogin = () => {
    const [phone, setPhone] = useState(""); // Phone state
    const [user, setUser] = useState(null); // Store confirmation result
    const [otp, setOtp] = useState("");
    const [mess , setmess] = useState("");

    const sendOtp = async () => {
        try {

            const recaptcha = new RecaptchaVerifier(auth , "recaptcha" , {});

            const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
            setUser(confirmation);

        } catch (err) {
            if (err.code === "auth/billing-not-enabled") {
setmess("This feature in firebase is paid , but i am broke , so you can not use it !!")
            }
            console.error('Error:', err);
        }
    };

    // Verify OTP when entered by the user
    const verifyOtp = async () => {
        try {


            const data = await user.confirm(otp);
            console.log('OTP verified:', data);

        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    return (
        <div className='flex flex-col h-screen items-center justify-center'>
            <div className='mb-7'>
                <PhoneInput
                    country={'us'}
                    value={phone}
                    onChange={(phone) => setPhone( "+" + phone)}
                />
                <button onClick={sendOtp} className='text-white mt-3'>Send Otp</button>
                <div id="recaptcha"></div>
                <div>
                    <p className='text-red-500'>{mess} </p>
                    <Link to="/register">go back to register</Link>
                </div>
            </div>

            <div>
                <input
                    type="text"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)} // Update OTP state
                    placeholder="Enter OTP"
                />
                <br />
                <button onClick={verifyOtp} className='text-white mt-4'>Verify OTP</button>
            </div>
        </div>
    );
};

export default PhoneLogin;
