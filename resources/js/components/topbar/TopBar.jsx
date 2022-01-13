import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { Menu, Layout, Dropdown, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

import API from '../../util/api';

import "antd/dist/antd.css";
import "./topbar.css";

// function UserOptionList({ position }) {
//     return (
//         <Menu>
//             <Menu.Item key="0">
//                 <Link to={"/" + position + "/profile"}>Profile</Link>
//             </Menu.Item>
//             <Menu.Item key="1">
//                 <Link to={"/" + position + "/update"}>Update</Link>
//             </Menu.Item>
//             <Menu.Divider />
//             <Menu.Item key="3">
//                 <Link to="/">Log out</Link>
//             </Menu.Item>
//         </Menu>
//     );
// }

export default function App({ choose }) {
    const { user } = useContext(AuthContext);
    const [full_name, setFullName] = useState('');
    const position = user.position;
    useEffect( ()=>{
        if(user){
            console.log(user);
            API.get('/my-info')
            .then(function (res) {
                switch (res.data["error_code"]) {
                    case 0:
                        console.log(res.data.user.full_name);
                        setFullName(res.data.user.full_name);
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
        }
    }, []);
    var menu = [];
    var url = [];
    if (position == "admin") {
        menu = ['Courses', 'Students', 'Teachers'];
        url = ['/admin', '/admin/students', '/admin/teachers'];
    } else if (position == "teacher") {
        menu = ['My courses'];
        url = ['/teacher']
    } else if (position == "student") {
        menu = ['Home', 'My Courses'];
        url = ['/', '/my-courses'];
    } else {
        menu = ["Home", "Login", "Register"];
        url = ['/', '/login', 'register'];
    }
    return (
        <div className="header">
            <div className="logo">
                <div>E-learning</div>
            </div>

            <div className="d-flex">
                <Menu
                className="flex-grow-1"
                mode="horizontal" defaultSelectedKeys={[choose]}>
                    {menu.map((item, index) => (
                        <Menu.Item key={item}>
                            <Link to={url[index]}>
                                {item}
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
            {/* <div className="user-info-frame">
                <Dropdown
                    overlay={
                        position ? <UserOptionList position={position} /> : ""
                    }
                    placement="bottomRight"
                >
                    <Dropdown.Button
                        overlay=""
                        icon={
                            <UserOutlined
                                style={{ fontSize: "24px", color: "#08c" }}
                            />
                        }
                    >
                        {username || "Guest"}
                    </Dropdown.Button>
                </Dropdown>
            </div> */}
        </div>
    );
}

/*
<Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
    Dropdown
</Dropdown.Button>

<a style={{display:'inline-block',position:'absolute',top:'0px',right:'0px'}} onClick={e => e.preventDefault()}>
    {this.props.username||'Guest'} <UserOutlined style={{ fontSize: '24px', color: '#08c' }} />
</a>



let pathName = window.location.pathname;
        console.log(pathName);
        let parts = pathName.split('/');
        let position = parts[1];
*/
