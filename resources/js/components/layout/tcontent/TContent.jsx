
import { Breadcrumb } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { Route } from 'react-router-dom';
import CoursesDetail from '../../../pages/student/CoursesDetail';
import CoursesLesson from '../../../pages/student/CoursesLesson';
import CoursesTest from '../../../pages/student/CoursesTest';
import "./TContent.css";

function TContent(props) {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Project 3</Breadcrumb.Item>
                <Breadcrumb.Item>Bài 1</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    overflow: "auto"
                }}
            >
                {/* <CoursesLesson /> */}
                <CoursesTest />
                {/* <CoursesDetail /> */}
            </Content>
        </Layout>
    );
}

export default TContent;