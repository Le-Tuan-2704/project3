import React from "react";
import ReactDOM from "react-dom";
import Routing from "./Routing.js";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <Routing />
  </AuthContextProvider>
  // </React.StrictMode>
  , document.getElementById("app")
);
