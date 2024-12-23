// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEfP_FGJR9z2hvUmGjKfrMrUSVhOMbV_o",
  authDomain: "react-project-781d5.firebaseapp.com",
  projectId: "react-project-781d5",
  storageBucket: "react-project-781d5.firebasestorage.app",
  messagingSenderId: "300695570979",
  appId: "1:300695570979:web:f23e226f51a470e719ff96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app , auth};
