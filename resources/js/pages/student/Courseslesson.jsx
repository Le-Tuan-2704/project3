import { Button, Input } from 'antd';
import React from 'react';
import "./CoursesLesson.css";

function CoursesLesson(props) {
    return (
        <div>
            <div className='content-video-box'>
                <iframe className='content-video' src="https://www.youtube.com/embed/eZD-kHUsQxw" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className='content-description-box'>
                <h3>
                    Description
                </h3>
                <div className='content-description-text'>
                    <p>
                        Xin chào mọi người, sau một thời gian hoạt động trên kênh Youtube - Easy Frontend,
                        mình được mọi người yêu cầu làm một khoá học ReactJS đầy đủ để mọi người tham khảo đầy đủ, trọn vẹn về ReactJS, giúp các bạn tự tin hơn khi làm việc với ReactJS.
                        Với mong muốn góp một chút công sức vào việc phát triển cộng đồng Frontend Việt Nam, nên mình đã quyết tâm thực hiện khoá học này.

                        Khóa học được tổ chức theo thứ tự sau:

                        Khởi tạo dự án từ đầu với create-react-app

                        Hướng dẫn setup Github + tự động deploy lên Vercel

                        Học kiến thức cơ bản qua các modules để hiểu được cách hoạt động của từng module.

                        Kết hợp phần kiến thức trên vào dự án thực tế.

                        Thấu hiểu việc khó khăn khi theo đuổi một khoá học dài lang mang, nên mình đã nỗ lực tinh gọn phần lý thuyết, để mọi người nắm được ý cơ bản xong vào ngay phần thực hành. Hi vọng mọi người sẽ hứng thú hihi
                    </p>
                </div>

            </div>
            <div className='content-comment-box'>
                <div className='content-comment-input'>
                    <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 400px)' }} defaultValue="" />
                        <Button type="primary">Gửi</Button>
                    </Input.Group>
                </div>
                <div className='content-comment-list'>
                    <div className='content-comment-item'>
                        <p>
                            nên mình đã nỗ lực tinh gọn phần lý thuyết
                        </p>
                    </div>
                    <div className='content-comment-item'>
                        <p>
                            nên mình đã nỗ lực tinh gọn phần lý thuyết
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CoursesLesson;