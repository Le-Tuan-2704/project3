import { useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Register from "./pages/register/Register";
import LoginMiddleware from "./middleware/LoginMiddleware";
import AdminCourses from './pages/admin-mycourses/AdminCourses';

import "antd/dist/antd.css";
import Home from "./pages/home/Home";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path='/login' element={LoginMiddleware(user ? user.position : '')} />
        <Route path="/register" element={<Register />} />


        <Route path="/admin/courses" element={(user && user.position == 'admin') ? <AdminCourses /> : <Navigate to='/login' />} />
        <Route path="/redirect" element={<Navigate to="/create" />} />
      </Routes>
    </BrowserRouter>
  );
}
