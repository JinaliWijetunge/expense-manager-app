import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Row, Col } from 'antd';
import ReactTable from 'react-table-v6'

import endPoints from '../../services/Endpoints';

function AllCategories() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    useEffect(() => {
        //get all categories
        setLoading(true)
       
       
    }, [])



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
    return (
        <div >
            {/* <div className="nic-parent" >
                <Button type="primary" className="go-button" onClick={showModal} >
                    Add New Category
                </Button>
            </div> */}
            <Modal title="Add New Category" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={false}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Category Name"
                        name="categoryName"
                        rules={[{ required: true, message: 'Required Field' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Row>
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
                            Add New Category
                        </div>
                    </div>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ marginTop: "5px" }}

                    >
                        <Form.Item
                            label="Category Name"
                            name="categoryName"
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

export default AllCategories;

const columns = [{
    Header: "Category Name",
    accessor: "categoryName"
},
{
    Header: "Created Date",
    accessor: "categoryName"
}
]