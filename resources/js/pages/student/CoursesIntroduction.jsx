import { Button, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React from 'react';

import "./CoursesIntroduction.css";

function CoursesIntroduction(props) {
    return (
        <div className='box-courses-introduction'>
            <div className="box-courses-introduction-first">
                <div className="courses-introduction-img">
                    <Image
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                </div>
                <div className="courses-introduction-title">
                    <Meta title="Name:" description="Laravel" />
                    <Meta title="Code:" description="121" />
                    <Meta title="Price:" description="10.000" />
                    <Button className='btn-buy-courses' type="primary" ghost>
                        Review
                    </Button>
                    <Button className='btn-buy-courses' type="primary" ghost>
                        Buy
                    </Button>
                </div>
            </div>
            <div className='box-courses-introduction-second'>
                <h2>Description</h2>
                <p>
                    Xin chào mọi người, sau một thời gian hoạt động trên kênh Youtube - Easy Frontend,
                    mình được mọi người yêu cầu làm một khoá học ReactJS đầy đủ để mọi người tham khảo đầy đủ, trọn vẹn về ReactJS, giúp các bạn tự tin hơn khi làm việc với ReactJS.
                    Với mong muốn góp một chút công sức vào việc phát triển cộng đồng Frontend Việt Nam, nên mình đã quyết tâm thực hiện khoá học này.
                </p>
            </div>
        </div>
    );
}

export default CoursesIntroduction;