import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './THeader.css';

function THeader(props) {

    let user = localStorage.getItem('user') ? localStorage.getItem('user') : null;
    user = JSON.parse(user);
    let menucustom = null;
    if (user != null) {
        menucustom =
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1">
                    <NavLink
                        to="/"
                    >
                        Home
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink
                        to="/courses"
                    >
                        My Course
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
    } else {
        menucustom =
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1">
                    <NavLink
                        to="/"
                    >
                        Home
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink
                        to="/login"
                    >
                        Login
                    </NavLink>
                </Menu.Item>

                <Menu.Item key="3"><NavLink
                    to="/register"
                >
                    Register
                </NavLink></Menu.Item>
            </Menu>
    }

    return (
        <Header className="header">
            <div className="logo" >
                <h3 className='login-text'>
                    TW ELearning
                </h3>
            </div>
            {menucustom}

            {user ? <div className="auth" >
                <div className='auth-img'>
                </div>
                <div className='auth-text'>
                    {user.login_name}
                </div>
            </div> : null}
        </Header>
    );
}

export default THeader;