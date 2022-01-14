import { Tree } from 'antd';
import {
    DownOutlined,
    CarryOutOutlined,
    FileImageOutlined,
    FileUnknownOutlined,
} from '@ant-design/icons';

import { Menu, Dropdown, message } from 'antd';

import TopBar from '../../components/topbar/TopBar';
import DeleteCourseModal from './DeleteCourseModal';
import AddCourseModal from './AddCourseModal';
import ViewCourse from './ViewCourse';
import { useEffect, useState } from 'react';
import API from '../../util/api';

var courseId = 0;
var courses = [];
export default function AdminCourse() {
    console.log('render admin course');
    const [courseTreeData, setCourseTreeData] = useState([]);
    const [isDeleteCourseModalVisible, setIsDeleteCourseModalVisible] = useState(false);
    const [isUpdateCourseModalVisible, setIsUpdateCourseModalVisible] = useState(false);
    const [isAddCourseModalVisible, setIsAddCourseModalVisible] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState('');

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

    const deleteCourse = () => {
        API.delete(`/course/${courseId}`)
            .then((res) => {
                if (res.data.error_code) {
                    message.error('Delete course fails');
                    return;
                }
                if (selectedCourseId == `C-${courseId}`)
                    setSelectedCourseId('');
                courses.forEach((item, index) => {
                    if (item.id == courseId) {
                        courses.splice(index, 1);
                        setCourseTreeData(getCourseTreeData(courses));
                    }
                });
                message.success('Delete course is okey!');
            }).catch((err) => {
                console.log(err);
            })
    }

    const updateCourse = (course) => {
        if (selectedCourseId == `C-${courseId}`)
            setSelectedCourseId('');
        API.put(`/course/${courseId}`, course)
            .then((res) => {
                if (res.data.error_code) {
                    message.error('Update course fails');
                    return;
                }
                if (selectedCourseId == '')
                    setSelectedCourseId(`C-${courseId}`);
            }).catch((err) => {
                console.log(err);
            })
    }

    const addCourse = (course) => {
        courses.push(course);
        setCourseTreeData(getCourseTreeData(courses));
        if (selectedCourseId)
            setSelectedCourseId(`C-${course.id}`);
    }

    useEffect(() => {
        API.get('/my-course-tree')
            .then(function (res) {
                switch (res.data["error_code"]) {
                    case 0:
                        courses = res.data.courses;
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
    return (
        <>
            <TopBar choose="Courses" />
            {isDeleteCourseModalVisible && DeleteCourseModal({ deleteCourse, isDeleteCourseModalVisible, setIsDeleteCourseModalVisible })}
            {isAddCourseModalVisible && AddCourseModal({ addCourse, isAddCourseModalVisible, setIsAddCourseModalVisible })}
            <div className="d-flex" style={{ height: 'calc(100vh - 41px)' }}>
                <div className="d-flex menu-bar overflow-auto" style={{ width: '350px' }}>
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
                </div>
                <div className="content-bar flex-grow-1 overflow-auto bg-white" style={{ padding: '20px' }}>
                    {selectedCourseId && <ViewCourse courseId={selectedCourseId.slice(2)} />}
                </div>
            </div>
        </>
    )
}
