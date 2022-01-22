import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "../css/app.css";
import TLayout from "./components/layout/tlayout/TLayout.jsx";
import { AuthContextProvider } from "./context/AuthContext";

import "antd/dist/antd.css";
import "./style.css";

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
