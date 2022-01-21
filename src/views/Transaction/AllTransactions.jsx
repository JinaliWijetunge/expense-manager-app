import React, { useState } from 'react';
import { DatePicker, Button, Form, Input, Row, Col, Select } from 'antd';
import ReactTable from 'react-table-v6'
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import ModalConfirm from '../../components/modals/ModalConfirm';
import EditTransaction from '../../components/modals/EditTransaction';
function AllTransactions() {
    const [editModalVsibile, setIsModalVisible] = useState(false);
    const [isDeletModalVisible, setIsDeleteModalVisible] = useState(false)
    const [form] = Form.useForm();
    const [formMonth] = Form.useForm();
    const [formEdit] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsDeleteModalVisible(false)
    };
    const onFinish = (values) => {
        console.log(values)



    }

    const onFinishEdit = (values) => {
        console.log(values)



    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    const onClickRemove = (index) => {

        // setIndex(index)
        setIsDeleteModalVisible(true)
    }
    const handleDeleteOk = () => {
        setIsDeleteModalVisible(false)

    }


    const columns = [{
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Category",
        accessor: "categoryName"
    },
    {
        Header: "Amount",
        accessor: "amount"
    },
    {
        Header: "Action",
        accessor: "id",
        Cell: row => {
            return (
                <div className='table-action-column' style={{ display: "block" }}>
                    <Button className='btn-table-edit' icon={<EditFilled color='#004ffc' />} onClick={() => {
                        console.log(row)
                        showModal();
                    }}></Button>
                    <Button className='btn-table-delete' icon={<DeleteFilled />} onClick={() => onClickRemove(row.index)}></Button>
                </div>
            )
        }
    }]

    return (
        <div >
            <div className="nic-parent" >
                <Row>
                    <Form
                        form={formMonth}
                        layout="inline"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Month"
                            name="month"
                            rules={[{ required: true, message: 'Required Field' }]}
                        >
                            <DatePicker onChange={onChange} picker="month" placeholder="Select a month" />
                        </Form.Item>
                        <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type="primary" className="go-button" htmlType="submit">
                                Get transactions for the month
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </div>

            <Row style={{ marginTop: "10px" }}>
                <Col sm={24} md={18} lg={14} xl={14}>
                    <ReactTable
                        columns={columns}
                        data={data}
                        defaultPageSize={5}
                        showPageSizeOptions={true}
                        style={{ marginTop: "5px" }}
                    />
                </Col>
                <Col span={1}>
                    <div style={{ borderLeft: " 1px solid #646878", height: "100%", position: 'absolute', left: '25%' }}></div>
                </Col>
                <Col sm={24} md={18} lg={9} xl={9}>
                    <div className="nic-parent" style={{ display: 'grid', color: "#00abc5 " }} >
                        <div type="primary"  >
                            Add New Transaction
                        </div>
                    </div>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinishEdit}
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
                </Col>
            </Row>
            <ModalConfirm
                title="Delet Message"
                isModalVisible={isDeletModalVisible}
                handleCancel={handleCancel}
                handleOk={handleDeleteOk}
                body={`Are you sure you want to remove this transaction`}

            />
            <EditTransaction
                isModalVisible={editModalVsibile}
                handleCancel={handleCancel}
                onFinish={onFinishEdit}
                formEdit={formEdit}
            />
        </div>
    );
}

export default AllTransactions;


const data = [{
    name: "Transaction 1",
    categoryName: "Food",
    amount: 100,
    id: 1

}]