import React from "react"
import { Modal, Button, Divider, Alert, } from "antd";

const ModalConfirm = ({ title, body,isModalVisible, handleCancel,handleOk, deleteSuccess, deleteFailed }) => {
    return (
        <Modal title={title} visible={isModalVisible} onCancel={handleCancel}
            footer={[
                <div>
                    <Button className='modal-confirm' type='text' onClick={handleOk}> Confirm</Button>
                    <Divider type="vertical" />
                    <Button className='modal-cancel' type='text' onClick={handleCancel}> Cancel</Button>
                </div>
            ]}
        >
            <p>{body}</p>
            {deleteSuccess && <Alert type="success" message={deleteSuccess}/>}
           { deleteFailed && <Alert type="error" message={deleteFailed}/>}
        </Modal>
    )

}

export default ModalConfirm;