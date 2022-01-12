import { useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Register from "./pages/register/Register";
import LoginMiddleware from "./middleware/LoginMiddleware";
import AdminCourses from './pages/admin-mycourses/AdminCourses';

import "antd/dist/antd.css";

function Home(){
    return <p>Home path</p>
}

export default function App() {
    const { user } = useContext(AuthContext);
    // let home_path = '/';
    // if(user && user.position) home_path = '/' + user.position;
    // let admin = (user && user.position=='admin')? true : false;
    // let teacher = (user && user.position=='teacher')? true : false;
    // let student = (user && user.position=='student')? true : false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ Home(false) } />
        <Route path='/login' element={ LoginMiddleware(user? user.position: '') } />
        <Route path="/register" element={<Register />} />


        <Route path="/admin/courses" element={ (user&&user.position=='admin')? <AdminCourses /> : <Navigate to='/login' /> } />

        {/* <Route path="/mycourse" element={ student? <StudentMyCourse /> : <Navigate to="/" />} />
        <Route path="/chatbox" element={ student? <ChatBox /> : <Navigate to="/" />} />

        <Route path="/teacher" element={ teacher? <TeacherMyCourse /> : <Navigate to="/" />} />
        <Route path="/teacher/chat" element={teacher? <Chat /> : <Navigate to="/" />} />

        <Route path="/admin" element={ admin? <Course /> : <Navigate to="/" />} />
        <Route path="/admin/student" element={ admin? <StudentManage /> : <Navigate to="/" />} />
        <Route path="/admin/teacher" element={ admin? <TeacherManage /> : <Navigate to="/" />} />
        <Route path="admin/chat" element={  admin? <Chat /> : <Navigate to="/" />} /> */}
        
        <Route path="/redirect" element={<Navigate to="/create" />} />
      </Routes>
    </BrowserRouter>
  );
}
