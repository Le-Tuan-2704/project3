import React from 'react';
import { Table, Popconfirm, Input, Menu, Dropdown } from 'antd';
const { Search } = Input;
import 'antd/dist/antd.css';
import './studenttable.css';

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
class StudentTable extends React.Component{
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
                }
            );
        }
        this.state = {
            data,
            columns: [
                {
                    title: 'Login name',
                    dataIndex: 'loginName',
                },
                {
                    title: 'Full Name',
                    dataIndex: 'fullName',
                },
                {
                    title: 'Phone',
                    dataIndex: 'phone',
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                },
                {
                    title: 'Gender',
                    dataIndex: 'gender',
                    filters: [
                        {
                            text: 'male',
                            value: 'male',
                        },
                        {
                            text: 'female',
                            value: 'female',
                        },
                        {
                            text: 'other',
                            value: 'other',
                        },
                    ],
                    onFilter: (value, record) => record.gender.indexOf(value) === 0,
                },
                {
                    title: 'Birthday',
                    dataIndex: 'birthday',
                },
                {
                    title: 'Hometown',
                    dataIndex: 'hometown',
                },
                {
                    title: 'Operation',
                    render: (_, record) =>
                    this.state.data.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                        <a href="#">Delete</a>
                        </Popconfirm>
                    ) : null,
                },
            ],
        };
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
            <h2 >Student Info Table</h2>
            <span  className="right-box">
            <input placeholder="Input text to search" />
            <Dropdown.Button className="search-button" overlay={menu}>Search</Dropdown.Button>
            </span>
            </div>
            <Table className="student-table" columns={this.state.columns} dataSource={this.state.data} bordered />
            </div>
            </>
        );
    };
}

export default StudentTable;