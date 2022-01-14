import { Layout } from 'antd';
import React from 'react';
import TBody from '../tbody/TBody';
import TFooter from '../tfooter/TFooter';
import THeader from '../theader/THeader';
import "./TLayout.css";

function TLayout(props) {
    return (
        <Layout className='layout-main'>
            <THeader />
            <TBody />
            <TFooter />
        </Layout>
    );
}

export default TLayout;