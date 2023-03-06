import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

//pages
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import About from "./pages/About";
import Register from "./pages/Register"
import Header from "./components/Header"
import AllPoems from "./pages/AllPoems";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import ResetPasswordUpdate from "./pages/ResetPasswordUpdate";
import RegistrationLanding from "./pages/RegistrationLanding";
import VerificationLanding from "./pages/VerificationLanding";
function App() {
  return (
    <>
      <Router>
        <div id="app">
          <Header />
          <Routes>
            <Route path="/" element={<About />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/explore" element={<AllPoems />}/>
            <Route path="/home" element={<Homepage />}/>
            <Route path="/reset_password" element={<ResetPasswordForm/>}/>
            <Route path="/users/reset_password/:id/:token" element={<ResetPasswordUpdate/>}/>
            <Route path="/register/success" element={<RegistrationLanding/>}/>
            <Route path="/users/verify/:verification_id" element={<VerificationLanding/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
