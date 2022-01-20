import {
    DownOutlined
} from '@ant-design/icons';
import { Dropdown, Menu, Tree, message } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React, { useEffect, useState } from 'react';
import API from '../../../util/api';
import './TSider.css'


function TSider(props) {

    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [courseTreeData, setCourseTreeData] = useState([]);

    const getCourseTreeData = (courses) => {
        var treeData = [];
        courses.forEach((item) => {
            var course = {
                title: (<Dropdown overlay={CourseMenu(item.id)} trigger={['contextMenu']}>
                    <div><i className="fa fa-book" /> {item.name}</div></Dropdown>),
                key: 'C-' + item.id,
                // icon: <i className="fa fa-book" />,
            };
            treeData.push(course);
        });
        return treeData;
    }

    const onSelected = (selectedKeys) => {
        //console.log(selectedKeys[0]);
        setSelectedCourseId(selectedKeys[0]);
    }

    useEffect(() => {
        API.get('/my-course-tree')
            .then(function (res) {
                console.log(res);
                switch (res.data["error_code"]) {
                    case 0:
                        let courses = res.data.courses;
                        console.log(courses);
                        setCourseTreeData(getCourseTreeData(courses));
                        break;
                    case 2:
                        message.warning(res.data.msg);
                        break;
                }
            })
            .catch((error) => {
                message.error("Request error: view detail in console");
                console.log(error);
            });
    }, []);

    const CourseMenu = (id) => {
        return (
            <Menu onClick={(event) => { event.domEvent.stopPropagation() }}>
                <Menu.Item key="1">
                    <a onClick={() => { courseId = id; setIsUpdateCourseModalVisible(true); }}>
                        Update course
                    </a>
                </Menu.Item>
                <Menu.Item key="2">
                    <a onClick={() => { courseId = id; setIsDeleteCourseModalVisible(true); }}>
                        Delete course
                    </a>
                </Menu.Item>
            </Menu>
        )
    }

    const AddCourseContext = () => {
        return (
            <Menu onClick={(event) => { event.domEvent.stopPropagation() }}>
                <Menu.Item key="1">
                    <a onClick={() => { setIsAddCourseModalVisible(true); }}>
                        Add course
                    </a>
                </Menu.Item>
            </Menu>
        )
    }

    return (
        <Sider width={250} className="site-layout-background">
            <Dropdown overlay={AddCourseContext()} trigger={['contextMenu']}>
                <Tree
                    className="flex-grow-1"
                    // showIcon
                    showLine={{ showLeafIcon: false }}
                    defaultExpandAll
                    switcherIcon={<DownOutlined />}
                    selectedKeys={[selectedCourseId]}
                    onSelect={onSelected}
                    treeData={courseTreeData}
                />
            </Dropdown>
        </Sider>
    );
}

export default TSider;