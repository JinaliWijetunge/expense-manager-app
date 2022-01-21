import React, { useState } from 'react';
import { DatePicker, Button, Form, Input, Row, Col, Select } from 'antd';
import ReactTable from 'react-table-v6'

function AllBudget() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [formMonth] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinish = (values) => {
        console.log(values)



    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

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
                                Get budget for the month
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </div>

            <Row style={{ marginTop: "10px" }}>
                <Col sm={24} md={18} lg={14} xl={14}>
                    <ReactTable
                        columns={columns}
                        data={[]}
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
                            Add New Budget
                        </div>
                    </div>
                    <Form
                        form={form}
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
                            label="Amount"
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
        </div>
    );
}

export default AllBudget;

const columns = [{
    Header: "Name",
    accessor: "categoryName"
},
{
    Header: "Amount",
    accessor: "categoryName"
},
{
    Header: "Category",
    accessor: "categoryName"
}]