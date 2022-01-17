import "antd/dist/antd.css";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LoginMiddleware from "./middleware/LoginMiddleware";
import AdminCourses from './pages/admin-mycourses/AdminCourses';
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import CoursesIntroduction from "./pages/student/CoursesIntroduction";
import MyCourses from "./pages/student/MyCourses";

export default function Routing() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path='/login' element={LoginMiddleware(user ? user.position : '')} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses" element={<MyCourses />} />
      <Route path="/courses/introduction" element={<CoursesIntroduction />} />

      {/* <Route path="/courses" element={(user && user.position == 'admin') ? <AdminCourses /> : <Navigate to='/login' />} /> */}
      <Route path="/redirect" element={<Navigate to="/create" />} />
    </Routes>
  );
}
