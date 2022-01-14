import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import './THeader.css';

function THeader(props) {
    return (
        <Header className="header">
            <div className="logo" >
                <h3 className='login-text'>
                    TW ELearning
                </h3>
            </div>
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
            <div className="auth" >
                <div className='auth-img'>
                </div>
                <div className='auth-text'>
                    Lê Văn A
                </div>
            </div>
        </Header>
    );
}

export default THeader;