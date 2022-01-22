<<<<<<< HEAD
import React from 'react';
import "./Home.css";

function Home(props) {
    return (
        <div className='home-box'>
            <div className='home-header-box'>
                <div>
                    <h1>TW Eleaning</h1>
                    <p>Học là nghiền</p>
                </div>
            </div>
            <div className='home-content-box'>
                <div className='home-content'>
                    <div className='home-content-img'></div>
                    <div className='home-content-text'>
                        <h3>Tài liệu kĩ thuật</h3>
                        <p>Nơi chia sẻ các bài hướng dẫn về kĩ thuật được sử dụng nhiều trong dự án thực tế sẽ được mình tổng hợp tại đây</p>
                    </div>
                </div>
                <div className='home-content'>
                    <div className='home-content-img'></div>
                    <div className='home-content-text'>
                        <h3>Blog kiến thức</h3>
                        <p>Chia sẻ về những kiến thức xung quanh cuộc sống lập trình viên, vui, buồn, sướng khổ, đủ mùi vị cuộc sống lập trình viên 🙂</p>
                    </div>
                </div>
                <div className='home-content'>
                    <div className='home-content-img'></div>
                    <div className='home-content-text'>
                        <h3>Khoá học Frontend</h3>
                        <p>Sắp tới sẽ có những khoá học do mình biên soạn và thiết kế nhằm giúp các bạn nắm vững kiến thức nền tảng của Frontend để có thể làm việc tốt hơn 😍</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
=======
import { useEffect, useState } from 'react';

import { Card, message } from 'antd';
const { Meta } = Card;
import Search from 'antd/lib/input/Search';

import './home.css'

import TopBar from '../../components/topbar/TopBar'
import CourseCard from './CourseCard';
import CourseDetailModal from './CourseDetailModal'

import API from '../../util/api';

var selectedCourse;
export default function App() {
    const [ courses, setCourses ] = useState([]);
    const [isCourseDetailModalVisible, setIsCourseDetailModalVisible] = useState(false);

    useEffect(()=>{
        API.get('courses')
        .then((res)=>{
            console.log(res.data.courses);
            setCourses(res.data.courses);
        })
        .catch((err)=>{
            message.error("Request error: view detail in console");
            console.log(err);
        })
    }, []);

    const onSearch = (value) => {
        API.get(`search-course/%${value}%`)
        .then((res)=>{
            setCourses(res.data.courses);
        })
        .catch((err)=>{
            message.error("Request error: view detail in console");
            console.log(err);
        })
    }

    const viewCourse = (course) => {
        selectedCourse = course;
        setIsCourseDetailModalVisible(true);
    }

    return (
        <>
        {
            isCourseDetailModalVisible && <CourseDetailModal course={selectedCourse} setIsModalVisible={setIsCourseDetailModalVisible} />
        }
        <TopBar choose="Home" />

        <div className="d-flex flex-column overflow-auto" style={{height: 'calc(100vh - 41px)'}}>
            <div className="d-flex justify-content-center my-3">
                <Search
                    style={{width: '400px'}}
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="middle"
                    onSearch={onSearch}
                />
            </div>
            <div className="box-courses-item d-flex flex-wrap px-5">
                {courses.map((course)=>
                    <CourseCard key={course.id} imgAlt="course image" imgSrc={course.picture} course={course} viewCourse={viewCourse} />
                )}
            </div>
        </div>
        </>
    );
}
>>>>>>> trado
