import React from "react";
import ReactDOM from "react-dom";
import Routing from "./Routing.js";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";
import TLayout from "./components/layout/tlayout/TLayout.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <BrowserRouter>
      <TLayout />
    </BrowserRouter>
  </AuthContextProvider>
  // </React.StrictMode>
  , document.getElementById("app")
);
