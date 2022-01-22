import React from "react"
import { Modal, Button, Form, Input, Select } from "antd";

const EditCategory = ({ title, initialValues, isModalVisible, handleCancel, onFinish, formEdit }) => {

    return (
        <Modal title={false} visible={isModalVisible} onCancel={handleCancel}
            footer={false}
        >
            <div className="nic-parent" style={{ display: 'grid', color: "#00abc5 " }} >
                <div type="primary"  >
                    Edit Transaction
                </div>
            </div>
            <Form
                form={formEdit}
                layout="vertical"
                onFinish={onFinish}
                style={{ marginTop: "5px" }}
                initialValues={initialValues}

            >
                <Form.Item
                    label="Category Name"
                    name="category_name"
                    rules={[{ required: true, message: 'Required Field' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button type="primary" htmlType="submit" className='go-button'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )

}

export default EditCategory;