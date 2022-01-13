import React from 'react';
import { Table, Popconfirm, Input, Menu, Dropdown } from 'antd';
const { Search } = Input;
import 'antd/dist/antd.css';
import './teachertable.css';

import { Switch } from 'antd';

function handleMenuClick(e) {
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="fullName">Full name</Menu.Item>
    <Menu.Item key="phone">Phone</Menu.Item>
    <Menu.Item key="email">Email</Menu.Item>
  </Menu>
);

// Student info: loginName, fullName, phone, email, gender, birthday, hometown
class TeacherTable extends React.Component{
    constructor(props){
        super(props);
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push(
                {//fullName, phone, email, gender, birthday, hometown
                    key: i,
                    loginName: 'login name '+i,
                    fullName: 'John Brown',
                    phone: "0123456789",
                    email: "trado006@gamil.com",
                    gender: "male",
                    birthday: "18/12/2000",
                    hometown: 'New York No. 1 Lake Park',
                    active: false,
                    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
                }
            );
        }
        this.state = {
            data,
        }
        this.columns = [
            {
                title: 'Img',
                render: (_, record) =>
                <img src="https://joeschmoe.io/api/v1/random" className="rounded-circle user_img"></img>
            },
            {title: 'Login name',dataIndex: 'loginName',},
            {title: 'Full Name',dataIndex: 'fullName',},
            {title: 'Phone',dataIndex: 'phone',},
            {title: 'Email',dataIndex: 'email',},
            {title: 'Gender',dataIndex: 'gender',
                filters: [
                    {text: 'male',value: 'male',},
                    {text: 'female',value: 'female',},
                    {text: 'other',value: 'other',},
                ],
                onFilter: (value, record) => record.gender.indexOf(value) === 0,
            },
            {title: 'Birthday',dataIndex: 'birthday',},
            {title: 'Hometown',dataIndex: 'hometown',},
            {
                title: 'Active',
                render: (_, record) => {return <Switch key={record.key} checked={record.active} 
                onChange={(checked)=>this.onChange(checked, record.key)} /> },
            },
            {
                title: 'Del',
                render: (_, record) =>
                this.state.data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                    <a href="#">Del</a>
                    </Popconfirm>
                ) : null,
            },
        ]
    }

    

    onChange = (checked, key) => {
        console.log(`switch to ${checked} and ${key}`);
        const data = [...this.state.data];
        this.setState({
            data: data.map((item, index) => {
                if(item.key == key){
                    item.active = checked;
                }
                return item;
            }),
            
        });
    }

    handleDelete = (key) => {
        const data = [...this.state.data];
        this.setState({
        data: data.filter((item) => item.key !== key),
        });
    };

    render(){
        return (
            <>
            <div className="student-screen">
            <div className="student-title">
            <h2 >Teacher Info Table</h2>
            <span  className="right-box">
            <Input placeholder="Input text to search" onPressEnter={e=> console.log(e.target.value)} />
            <Dropdown.Button className="search-button" overlay={menu}>Search</Dropdown.Button>
            </span>
            </div>
            <Table className="student-table" 
            columns={this.columns}
            expandable={{
                expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
            }}
            dataSource={this.state.data} bordered />
            </div>
            </>
        );
    };
}

export default TeacherTable;