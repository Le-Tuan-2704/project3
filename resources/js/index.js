import React from "react";
import ReactDOM from "react-dom";
import Routing from "./Routing.js";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  // <React.StrictMode>
    <AuthContextProvider>
      <Routing />
    </AuthContextProvider>
  // </React.StrictMode>
  ,document.getElementById("app")
);
