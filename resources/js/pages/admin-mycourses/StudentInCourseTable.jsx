import { Table, Space, message } from 'antd';
import { useState } from 'react';
import API from '../../util/api';


const data = [
  {
    id: 1,
    login_name: 'trado006',
    gender: 'male',
    full_name: 'John Brown',
    age: 32,
  },
];

export default function App({students, courseId}){
    const [data, setData] = useState([]);
    const columns = [
        {
          title: 'Login name',
          dataIndex: 'login_name',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Full name',
          dataIndex: 'full_name',
        },
        {
          title: 'Delete',
          key: 'delete',
          render: (record) => (
            <Space size="middle">
              <a>Delete</a>
            </Space>
          ),
        },
    ];
    var selectedStudentId = 0;
    const deleteStudentInCourse = () => {
        API.delete(`course/${courseId}/delete-student/${selectedStudentId}`)
        .then((res)=>{
            if(res.data.error_code){
                console.log(res.data);
                message.error('Request error: view more in console');
            }

        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <Table columns={columns} dataSource={data} />
    )
}