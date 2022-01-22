import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Row, Col, Alert } from 'antd';
import ReactTable from 'react-table-v6'
import Loader from "../../components/loader/Loader"
import Endpoints from '../../services/Endpoints';
import HTTPClient from '../../services/HTTPClient';

import { DeleteFilled, EditFilled } from '@ant-design/icons';
import ModalConfirm from '../../components/modals/ModalConfirm';
import EditCategory from '../../components/modals/EditCategory';

function AllCategories() {
    const [loading, setLoading] = useState(false)
    const [allCategories, setCategories] = useState([])
    const [username, setUsername] = useState(localStorage.username)
    const [createCategorySuccess, setCreateCategorySuccess] = useState()
    const [createCategoryFailed, setCreateCategoryFailed] = useState()
    const [form] = Form.useForm();
    const [formEdit] = Form.useForm();
    const [editModalVsibile, setIsModalVisible] = useState(false);
    const [isDeletModalVisible, setIsDeleteModalVisible] = useState(false)
    const [selestedIndex, setIndex] = useState()

    useEffect(() => {
        //get all categories
        loadCategories();

    }, [])

    const loadCategories = () => {
        setLoading(true);

        HTTPClient.Get(`${Endpoints.GET_ALL_CATEGORIES}/${username}`)
            .then(data => {
                console.log(data);
                setCategories(data.data.object)
                setLoading(false)


            }).catch(error => {
                console.log(error.msg)
                setLoading(false)
            })
        setTimeout(() => {
            setCreateCategoryFailed(false)
            setCreateCategorySuccess(false)
            form.resetFields();
        }, 3000);


    }


    const showModal = (index) => {
        setIndex(index)
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

        HTTPClient.Post(`${Endpoints.GET_ALL_CATEGORIES}/${username}`, values)
            .then(data => {
                console.log(data);
                setCreateCategorySuccess(data.data.msg)
                setLoading(false)
                loadCategories()


            }).catch(error => {
                console.log(error.msg)
                setCreateCategoryFailed(error.msg)
                setLoading(false)
            })
    }

    const columns = [{
        Header: "Category Name",
        accessor: "category_name"
    },
    {
        Header: "Action",
        accessor: "categoryName"
    },
    {
        Header: "Action",
        accessor: "id",
        Cell: row => {
            return (
                <div className='table-action-column' style={{ display: "block" }}>
                    <Button className='btn-table-edit' icon={<EditFilled color='#004ffc' />} onClick={() => {
                        console.log(row)
                        showModal(row.index);
                    }}></Button>
                    <Button className='btn-table-delete' icon={<DeleteFilled />} onClick={() => onClickRemove(row.index)}></Button>
                </div>
            )
        }
    }]

    const onClickRemove = (index) => {

        // setIndex(index)
        setIsDeleteModalVisible(true)
    }
    const handleDeleteOk = () => {
        setIsDeleteModalVisible(false)

    }
    const onFinishEdit = (values) => {
        console.log(values)



    }

    return (
        <div >
            {loading && <Loader />}
            <Row>
                <Col sm={24} md={18} lg={14} xl={14}>
                    <ReactTable
                        columns={columns}
                        data={allCategories}
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
                        form={formEdit}
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ marginTop: "5px" }}

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
                    {createCategorySuccess && <Alert type='success' message={createCategorySuccess} />}
                    {createCategoryFailed && <Alert type='error' message={createCategoryFailed} />}
                </Col>
            </Row>
            <ModalConfirm
                title="Delet Message"
                isModalVisible={isDeletModalVisible}
                handleCancel={handleCancel}
                handleOk={handleDeleteOk}
                body={`Are you sure you want to remove this transaction`}

            />
            <EditCategory
                isModalVisible={editModalVsibile}
                handleCancel={handleCancel}
                onFinish={onFinishEdit}
                formEdit={formEdit}
                initialValues={allCategories[selestedIndex]}
            />
        </div>
    );
}

export default AllCategories;