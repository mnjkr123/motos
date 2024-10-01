import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/materialdesignicons.min.css";
import "./assets/scss/themes.scss";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Marketing from "./pages/marketing";
import Agency from "./pages/agency";
import Portfolio from "./pages/portfolio";
import Maintenance from "./pages/maintenance";
import Error from "./pages/error";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ResetPassword from "./pages/auth/reset-password";
import Comingsoon from "./pages/comingsoon";
import Personal from "./pages/personal";
import Saas from "./pages/saas";
import Startup from "./pages/startup";
import Chatbot from "./pages/chatbot";

// // Load environment variables
// require("dotenv").config();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Marketing />} />
      <Route path="/marketing" element={<Marketing />} />
      <Route path="/agency" element={<Agency />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/startup" element={<Startup />} />
      <Route path="/saas" element={<Saas />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/error" element={<Error />} />
      <Route path="/auth-login" element={<Login />} />
      <Route path="/auth-signup" element={<Signup />} />
      <Route path="/comingsoon" element={<Comingsoon />} />
      <Route path="/auth-reset-password" element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
