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