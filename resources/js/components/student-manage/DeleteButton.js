import React from 'react';
import { useState } from "react";
import { Modal, Button} from 'antd';

function DeleteButton(props) {
    const [visible, setVisible] = useState(false);
    process = () => {
        console.log(props.id);
        setVisible(false);
    };
    return (
      <>
      <div style={{padding:'64px'}}>
        <Button onClick={() => setVisible(true)}>
          Delete
        </Button>
        <Modal
          title="Delete"
          visible={visible}
          onOk={process}
          onCancel={() => setVisible(false)}
          okText="Ok"
          cancelText="Cancel"
        >
        <span>Confirm to delete student</span>
        </Modal>
        </div>
      </>
    );
}

export default DeleteButton;