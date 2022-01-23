import React from "react"
import { Modal, Button, Form, Input, Select, Alert } from "antd";
import { validArray } from "../../_helpers/utilityFunctions";

const { Option } = Select
const EditTransaction = ({ title, allCategories, isModalVisible, handleCancel, onFinish, formEdit, initialValues, editTransaction, editTransactionFailed, isTranaction }) => {
    console.log("initialValues", initialValues)
    return (
        <Modal title={false} visible={isModalVisible} onCancel={handleCancel}
            footer={false}
        >
            <div className="nic-parent" style={{ display: 'grid', color: "#00abc5 " }} >
                <div type="primary"  >
                  {isTranaction?  "Edit Transaction": "Edit Budget"}
                </div>
            </div>
            {initialValues && <Form
                form={formEdit}
                layout="vertical"
                onFinish={onFinish}
                style={{ marginTop: "5px" }}
                initialValues={initialValues}

            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Required Field' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Required Field' }]}

                >
                    <Select placeholder="Select a category" disabled >
                        {validArray(allCategories) && allCategories.map((ctgry, index) => {
                            return (<Option value={ctgry.category_name}>{ctgry.category_name}</Option>)
                        })}
                    </Select>
                </Form.Item>
                {isTranaction &&<Form.Item
                    label="Transaction Type"
                    name="type"
                    rules={[{ required: true, message: 'Required Field' }]}
                >
                    <Select disabled>

                        <Option value="income">Income</Option>
                        <Option value="expense">Expense</Option>
                    </Select>
                </Form.Item>}
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: 'Required Field' },{pattern: /^\d+$/, message: "Invalid format"}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Notes"
                    name="note"
                    rules={[{ required: true, message: 'Required Field' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Recurring"
                    name="recurring"
                    rules={[{ required: true, message: 'Required Field' }]}
                >
                    <Select placeholder="Select Recurring" >
                        <Option value="monthly">Monthly</Option>
                    </Select>
                </Form.Item>
                <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button type="primary" htmlType="submit" className='go-button'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            }
            {editTransaction && <Alert type='success' message={editTransaction} />}
            {editTransactionFailed && <Alert type='error' message={editTransactionFailed} />}
        </Modal>
    )

}

export default EditTransaction;