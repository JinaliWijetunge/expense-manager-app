import React from "react"
import { Modal, Button, Form, Input, Select } from "antd";

const EditTransaction = ({ title, body, isModalVisible, handleCancel, onFinish, formEdit}) => {
    
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

            >
                <Form.Item
                    label="Name"
                    name="budgetName"
                    rules={[{ required: true, message: 'Required Field' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Required Field' }]}
                >
                    <Select />
                </Form.Item>
                <Form.Item
                    label="Transaction Type"
                    name="category"
                    rules={[{ required: true, message: 'Required Field' }]}
                >
                    <Select />
                </Form.Item>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: 'Required Field' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Notes"
                    name="amount"
                    rules={[{ required: true, message: 'Required Field' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Recurring"
                    name="amount"
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

export default EditTransaction;