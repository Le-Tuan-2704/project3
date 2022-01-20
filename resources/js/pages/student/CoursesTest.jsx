import React from 'react';

import "./CoursesTest.css"

function CoursesTest(props) {
    return (
        <div>
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
            <div className='test-list'>
                <div className="test-item">
                    <div className='test-item-title'>
                        <h3>Question 1:</h3>
                    </div>
                    <div className="test-item-quiz">

                    </div>
                    <div className="test-item-answers">
                        <div className='test-item-answers-box'>
                            <div className='test-item-answer'>
                                Câu a
                            </div>
                            <div className='test-item-answer'>
                                Câu b
                            </div>
                        </div>
                        <div className='test-item-answers-box'>
                            <div className='test-item-answer'>
                                Câu c
                            </div>
                            <div className='test-item-answer'>
                                Câu d
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursesTest;