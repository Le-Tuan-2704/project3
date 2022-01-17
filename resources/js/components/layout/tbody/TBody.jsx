import Layout from 'antd/lib/layout/layout';
import React from 'react';
import Routing from '../../../Routing';

const divStyle = {
    overflow: "auto"
};

function TBody(props) {
    return (
        <Layout style={divStyle}>
            <Routing />
        </Layout>
    );
}

export default TBody;
