import "antd/dist/antd.css";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LoginMiddleware from "./middleware/LoginMiddleware";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import CoursesIntroduction from "./pages/student/CoursesIntroduction";
import CoursesLayout from "./pages/student/CoursesLayout";
import MyCourses from "./pages/student/MyCourses";

export default function Routing() {
  const { user } = useContext(AuthContext);

  return (
    <Routes >
      <Route path="/" exact element={<Home />} />
      <Route path='/login' element={LoginMiddleware(user ? user.position : '')} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses" exact element={<MyCourses />} />
      <Route path="/courses/introduction" element={<CoursesIntroduction />} />
      <Route path="/mycourses" element={<CoursesLayout />} />
      {/* <Route path="/courses" element={(user && user.position == 'admin') ? <AdminCourses /> : <Navigate to='/login' />} /> */}

      <Route path="/mycourses/test" element={<Navigate to="/create" />} />
      <Route path="/redirect" element={<Navigate to="/create" />} />
    </Routes >
  );
}
