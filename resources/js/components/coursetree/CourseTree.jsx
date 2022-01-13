import { Tree } from 'antd';
const { TreeNode } = Tree;
import {
    DownOutlined,
    CarryOutOutlined,
    FileImageOutlined,
    FileUnknownOutlined,
} from '@ant-design/icons';

function getCourseTreeData(courses) {
    var treeData = [];
    courses.forEach( (item) => {
        var lectures = [];
        item.lectures.forEach( (item) => {
            var tests = [];
            item.tests.forEach( (item) => {
                var test = {
                    title: item.name,
                    key: 'T-'+item.id,
                    icon: <FileImageOutlined />,
                }
                tests.push(test);
            })
            var lecture = {
                title: item.name,
                key: 'L-'+item.id,
                icon: <FileImageOutlined />,
                children: tests,
            }
            lectures.push(lecture);
        })
        var course = {
            title: item.name,
            key: 'C-'+item.id,
            icon: <i class="fa fa-book" />,
            children: lectures,
        };
        treeData.push(course);
    });
    return treeData;
}



import { Tree } from 'antd';
import {
  DownOutlined,
  CarryOutOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
} from '@ant-design/icons';

import { Menu, Dropdown } from 'antd';

const menu = (
  <Menu onClick={(event) => {event.domEvent.stopPropagation()}}>
    <Menu.Item key="1" padding="123">
        <a padding="123" onClick={(event) => {console.log(event.target.getAttribute('padding'));}}>
            1st menu item
        </a>
    </Menu.Item>
    <Menu.Item key="2" padding="123">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

const treeData = [
  {
    title: (<Dropdown overlay={menu} trigger={['contextMenu']}><span>parent 1</span></Dropdown>),
    key: '0-0',
    icon: <i className="fa fa-book" />,
    children: [
        {
          title: 'leaf',
          key: '0-0-0',
          icon: <FileImageOutlined />,
          children: [
            {
                title: 'leaf',
                key: '0-0-1',
                icon: <FileUnknownOutlined />,
            },
          ]
        },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    icon: <i className="fa fa-book" />,
  },
];

function onSelected(selectedKeys) {
    console.log(selectedKeys);
}

export default function App() {
    return (
        <Tree
            showIcon
            showLine={{showLeafIcon: false}}
            defaultExpandAll
            defaultSelectedKeys={['0-0-0']}
            switcherIcon={<DownOutlined />}
            onSelect={onSelected}
            treeData={treeData}
        />
    )
}