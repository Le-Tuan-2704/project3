import Layout from 'antd/lib/layout/layout';
import React from 'react';
import TContent from '../tcontent/TContent';
import TSider from '../tsider/TSider';

function TBody(props) {
    return (
        <Layout>
            <TSider />
            <TContent />
        </Layout>
    );
}

export default TBody;
