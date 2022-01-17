import { Card } from 'antd';
const { Meta } = Card;
import Search from 'antd/lib/input/Search';
import Layout from 'antd/lib/layout/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import "./MyCourses.css"

function MyCourses(props) {
    const onSearch = value => console.log(value);

    return (
        <Layout className='box-my-courses'>
            <div className="box-search">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="middle"
                    onSearch={onSearch}
                />
            </div>
            <div className="box-courses-item">
                <Link to="/courses/introduction">
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Name:" description="Laravel" />
                        <Meta title="Code:" description="121" />
                        <Meta title="Price:" description="10.000" />
                    </Card>
                </Link>

                <Link to="/courses/introduction">
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Name:" description="Laravel" />
                        <Meta title="Code:" description="121" />
                        <Meta title="Price:" description="10.000" />
                    </Card>
                </Link>
            </div>
        </Layout>
    );
}

export default MyCourses;