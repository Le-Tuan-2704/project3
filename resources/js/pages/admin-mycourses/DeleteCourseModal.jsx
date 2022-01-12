import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function App({ deleteCourse, isDeleteCourseModalVisible, setIsDeleteCourseModalVisible }){
  const handleOk = () => {
    setIsDeleteCourseModalVisible(false);
    deleteCourse();
  };

  const handleCancel = () => {
    setIsDeleteCourseModalVisible(false);
  };

  return (
    <>
      <Modal
      title="Are you sure delete this course?" icon={<ExclamationCircleOutlined />}
      okText='Yes' okType='danger' cancelText='Cancel'
      visible={isDeleteCourseModalVisible}
      onOk={handleOk} onCancel={handleCancel}>
        <p>Click yes to confirm delete this course</p>
      </Modal>
    </>
  );
};