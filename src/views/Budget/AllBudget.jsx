import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Form, Input, Row, Col, Select, Alert } from 'antd';
import ReactTable from 'react-table-v6'
import Endpoints from '../../services/Endpoints';
import HTTPClient from '../../services/HTTPClient';
import Loader from '../../components/loader/Loader';
import { validArray } from '../../_helpers/utilityFunctions';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import ModalConfirm from '../../components/modals/ModalConfirm';
import EditTransaction from '../../components/modals/EditTransaction';
import moment from 'moment';
import { presetCategories } from '../../_helpers/constansts';

const { Option } = Select

function AllBudget() {
    const day = moment().format("YYYY")
    const monthVal = moment().format("MM")
    const [editModalVsibile, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [formEdit] = Form.useForm();
    const [formMonth] = Form.useForm();
    const [username, setUsername] = useState(localStorage.username)
    const [loading, setLoading] = useState(false)
    const [allBudget, setAllBudget] = useState();
    const [allCategories, setCategories] = useState(presetCategories)
    const [addBudget, setAddBudget] = useState()
    const [addBudgetFailed, setAddBudgetFailed] = useState()
    const [month, setMonth] = useState(`${day}-${monthVal}`)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [isDeletModalVisible, setIsDeleteModalVisible] = useState(false)
    const [selectedIndex, setIndex] = useState()
    const [deleteSuccess, setDeleteSuccess] = useState()
    const [deleteFailed, setDeleteFailed] = useState()
    const [editTransaction, setEditTransaction] = useState()
    const [editTransactionFailed, setEditTransactionFailed] = useState()


    useEffect(() => {
        //get all categories
        loadCategories()
        loadBudget()

    }, [])

    const loadCategories = () => {
        setLoading(true);

        HTTPClient.Get(`${Endpoints.GET_ALL_CATEGORIES}/${username}`)
            .then(data => {
                console.log(data);
                setCategories([...allCategories, ...data.data.object])
                setLoading(false)


            }).catch(error => {
                console.log(error.msg)
                setLoading(false)
            })

    }


    const loadBudget = (values) => {
        debugger
        setLoading(true);

        HTTPClient.Get(`${Endpoints.GET_ALL_BUDGET}/${username}?payment_type=budget&&type=all&&category=${selectedCategory}&&date=${month}`)
            .then(data => {
                console.log(data);
                setAllBudget(data.data.object)
                setLoading(false)


            }).catch(error => {
                console.log(error.msg)
                setLoading(false)
                setAllBudget([])

            })

        setTimeout(() => {
            setAddBudgetFailed(false)
            setAddBudget(false)
            form.resetFields();
            setEditTransactionFailed(false)
            setEditTransaction(false)
            formEdit.resetFields();
            setIsModalVisible(false)
        }, 3000);
    }
    const onFinishEdit = (values) => {
        setLoading(true)
        setEditTransactionFailed(false)
        setEditTransaction(false)
        values.date = allBudget[selectedIndex].month
        HTTPClient.Post(`${Endpoints.GET_ALL_BUDGET}/edit/${username}/budget/${allBudget[selectedIndex].id}`, values)
            .then(data => {
                console.log(data);
                setEditTransaction(data.data.msg)
                setLoading(false)
                loadBudget()

            }).catch(error => {
                console.log(error.msg)
                setLoading(false)
                setEditTransactionFailed(error.msg)
            })



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
        setIsDeleteModalVisible(false)
        setEditTransactionFailed(false)
        setEditTransaction(false)
        formEdit.resetFields();
    };
    const onFinish = (values) => {
        console.log(values)
        setLoading(true)
        setAddBudgetFailed(false)
        setAddBudget(false)
        HTTPClient.Post(`${Endpoints.GET_ALL_BUDGET}/${username}/budget/${month}`, values)
            .then(data => {
                console.log(data);
                setAddBudget(data.data.msg)
                setLoading(false)
                loadBudget()

            }).catch(error => {
                console.log(error.msg)
                setLoading(false)
                setAddBudgetFailed(error.msg)
            })


    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setMonth(dateString)
    }

    const onClickRemove = (index) => {
        setDeleteSuccess(false)
        setDeleteFailed(false)
        setIndex(index)
        setIsDeleteModalVisible(true)
    }
    const handleDeleteOk = () => {
        setLoading(true)
        HTTPClient.Delete(`${Endpoints.GET_ALL_BUDGET}/delete/${username}/budget/${allBudget[selectedIndex].id}`)
            .then(data => {
                console.log(data);
                setIsDeleteModalVisible(false)
                setDeleteSuccess(data.data.msg)
                setLoading(false)
                loadBudget()

            }).catch(error => {
                console.log(error.msg)
                setDeleteFailed(error.msg)
                setLoading(false)
            })

    }

    const columns = [{
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Amount (LKR)",
        accessor: "amount"
    },
    {
        Header: "Category",
        accessor: "category"
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

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }

    return (
        <div >
            {loading && <Loader />}
            <div className="nic-parent" >
                <Row>
                    <Form
                        form={formMonth}
                        layout="inline"
                        onFinish={loadBudget}
                        initialValues={
                            {
                                "category": selectedCategory,
                                "month": moment(month)
                            }
                        }
                    >
                        <Form.Item
                            label="Month"
                            name="month"
                            rules={[{ required: true, message: 'Required Field' }]}
                        >
                            <DatePicker onChange={onChange} picker="month" placeholder="Select a month" disabledDate={disabledDate} />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[{ required: true, message: 'Required Field' }]}
                        >
                            <Select placeholder="Select a category" onChange={(value) => setSelectedCategory(value)}>
                                <Option value="all">All</Option>
                                {validArray(allCategories) && allCategories.map((ctgry, index) => {
                                    return (<Option value={ctgry.category_name}>{ctgry.category_name}</Option>)
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type="primary" className="go-button" htmlType="submit">
                                Get budget for the month
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </div>

            {allBudget && <Row style={{ marginTop: "10px" }}>
                <Col sm={24} md={18} lg={14} xl={14}>
                    <ReactTable
                        columns={columns}
                        data={allBudget}
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
                        initialValues={{
                            "recurring": "none"
                        }}

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
                            rules={[
                                { required: true, message: 'Required Field' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        console.log("adll", allBudget)
                                        if (allBudget.find(x => x.category == value)) {
                                            return Promise.reject(new Error('A Budget already exists for the selected category!'));
                                        }

                                        return Promise.resolve();
                                    }
                                })]}
                        >

                            <Select placeholder="Select a category" >
                                {validArray(allCategories) && allCategories.map((ctgry, index) => {
                                    return (<Option value={ctgry.category_name}>{ctgry.category_name}</Option>)
                                })}
                            </Select>

                        </Form.Item>
                        <Form.Item
                            label="Amount (LKR)"
                            name="amount"
                            rules={[{ required: true, message: 'Required Field' }, { pattern: /^\d+$/, message: "Invalid format" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Notes"
                            name="note"
                        // rules={[{ required: true, message: 'Required Field' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Recurring"
                            name="recurring"
                        // rules={[{ required: true, message: 'Required Field' }]}
                        >
                            <Select placeholder="Select Recurring" >
                                <Option value="none">None</Option>
                                <Option value="minute">Every Minute</Option>
                                <Option value="weekly">Every Week</Option>
                                <Option value="monthly">Every Month</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type="primary" htmlType="submit" className='go-button'>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    {addBudget && <Alert type='success' message={addBudget} />}
                    {addBudgetFailed && <Alert type='error' message={addBudgetFailed} />}
                </Col>
            </Row>}
            <ModalConfirm
                title="Delet Message"
                isModalVisible={isDeletModalVisible}
                handleCancel={handleCancel}
                handleOk={handleDeleteOk}
                body={`Are you sure you want to remove this budget`}
                deleteSuccess={deleteSuccess}
                deleteFailed={deleteFailed}

            />
            <EditTransaction
                isModalVisible={editModalVsibile}
                handleCancel={handleCancel}
                onFinish={onFinishEdit}
                formEdit={formEdit}
                initialValues={editModalVsibile && allBudget[selectedIndex]}
                allCategories={allCategories}
                editTransaction={editTransaction}
                editTransactionFailed={editTransactionFailed}
                isTranaction={false}
            />
        </div>
    );
}

export default AllBudget;

