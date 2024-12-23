import HomePage from "./Components/homePage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/Register";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import MainPage from "./Components/MainPage";
import PageNotFound from "./Components/pageNotFound";
import PasswordResetForm from "./Components/PasswordResetForm";
import PhoneLogin from "./Components/PhoneLogin";
import PasswordChangePage from "./Components/PasswordChange";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<AuthProvider><RegisterPage /></AuthProvider>} />
        <Route path="/login" element={<AuthProvider><LoginPage /></AuthProvider>} />
        <Route path="/home" element={<AuthProvider><MainPage /></AuthProvider>} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/reset" element={<AuthProvider><PasswordResetForm></PasswordResetForm></AuthProvider>}></Route>
        <Route path="/phonelogin" element={<AuthProvider>
            <PhoneLogin></PhoneLogin>
        </AuthProvider>}></Route>
        <Route path="/changepass" element={<AuthProvider>
           <PasswordChangePage></PasswordChangePage>
        </AuthProvider>}></Route>
      </Routes>
    </>
  );
}

export default App;
