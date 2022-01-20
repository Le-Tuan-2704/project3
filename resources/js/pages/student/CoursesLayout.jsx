import Layout from 'antd/lib/layout/layout';
import React from 'react';
import TContent from '../../components/layout/tcontent/TContent';
import TSider from '../../components/layout/tsider/TSider';

function CoursesLayout(props) {
    return (
        <Layout>
            <TSider></TSider>
            <TContent></TContent>
        </Layout>
    );
}

export default CoursesLayout;