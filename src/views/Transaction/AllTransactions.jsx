import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Form, Input, Row, Col, Select, Alert } from 'antd';
import ReactTable from 'react-table-v6'
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import ModalConfirm from '../../components/modals/ModalConfirm';
import EditTransaction from '../../components/modals/EditTransaction';
import Endpoints from '../../services/Endpoints';
import HTTPClient from '../../services/HTTPClient';
import Loader from '../../components/loader/Loader';
import { validArray } from '../../_helpers/utilityFunctions';
import moment from 'moment';
import { presetCategories } from '../../_helpers/constansts';

const { Option } = Select

function AllTransactions() {
    const day = moment().format("YYYY")
    const monthVal = moment().format("MM")
    const [editModalVsibile, setIsModalVisible] = useState(false);
    const [isDeletModalVisible, setIsDeleteModalVisible] = useState(false)
    const [form] = Form.useForm();
    const [formMonth] = Form.useForm();
    const [formEdit] = Form.useForm();
    const [username, setUsername] = useState(localStorage.username)
    const [loading, setLoading] = useState(false)
    const [month, setMonth] = useState(`${day}-${monthVal}`)
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedType, setSelectedType] = useState("all")
    const [allCategories, setCategories] = useState(presetCategories)
    const [allTransactions, setAllTransactions] = useState()
    const [addTransaction, setAddTransaction] = useState()
    const [addTransactionFailed, setAddTransactionFailed] = useState()
    const [selectedIndex, setIndex] = useState()
    const [editTransaction, setEditTransaction] = useState()
    const [editTransactionFailed, setEditTransactionFailed] = useState()
    const [deleteSuccess, setDeleteSuccess] = useState()
    const [deleteFailed, setDeleteFailed] = useState()
    const [overallAmount, setOverallAmount] = useState()


    useEffect(() => {
        //get all categories
        loadCategories()
        loadTransactions()

    }, [])

    const loadCategories = () => {
        setLoading(true);

        HTTPClient.Get(`${Endpoints.GET_ALL_CATEGORIES}/${username}`)
            .then(data => {
                console.log(data);
                setCategories([...allCategories,...data.data.object])
                setLoading(false)


            }).catch(error => {
                console.log(error.msg)
                setLoading(false)
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
    };
    const onFinish = (values) => {
        console.log(values)

        setLoading(true)
        setAddTransactionFailed(false)
        setAddTransaction(false)
        HTTPClient.Post(`${Endpoints.GET_ALL_BUDGET}/${username}/transaction/${month}`, values)
            .then(data => {
                console.log(data);
                setAddTransaction(data.data.msg)
                setLoading(false)
                loadTransactions()

            }).catch(error => {
                console.log(error.msg)
                setLoading(false)
                setAddTransactionFailed(error.msg)
            })

    }

    const onFinishEdit = (values) => {
        setLoading(true)
        setEditTransactionFailed(false)
        setEditTransaction(false)
        values.date = allTransactions[selectedIndex].month
        HTTPClient.Post(`${Endpoints.GET_ALL_BUDGET}/edit/${username}/transaction/${allTransactions[selectedIndex].id}`, values)
            .then(data => {
                console.log(data);
                setEditTransaction(data.data.msg)
                setLoading(false)
                loadTransactions()

            }).catch(error => {
                console.log(error.msg)
                setLoading(false)
                setEditTransactionFailed(error.msg)
            })



    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setMonth(dateString)
    }

    const onClickRemove = (index) => {

        setIndex(index)
        setIsDeleteModalVisible(true)
    }
    const handleDeleteOk = () => {
        setLoading(true)
        HTTPClient.Delete(`${Endpoints.GET_ALL_BUDGET}/delete/${username}/transaction/${allTransactions[selectedIndex].id}`)
            .then(data => {
                console.log(data);
                setIsDeleteModalVisible(false)
                setDeleteSuccess(data.data.msg)
                setLoading(false)
                loadTransactions()

            }).catch(error => {
                console.log(error.msg)
                setDeleteFailed(error.msg)
                setLoading(false)
            })


    }

    const loadTransactions = () => {
        debugger
        setLoading(true);
        getOverAllAmount()

        HTTPClient.Get(`${Endpoints.GET_ALL_BUDGET}/${username}?payment_type=transaction&&type=${selectedType}&&category=${selectedCategory}&&date=${month}`)
            .then(data => {
                console.log(data);
                setAllTransactions(data.data.object)
                setLoading(false)


            }).catch(error => {
                console.log(error.msg)
                setLoading(false)
                setAllTransactions([])

            })

        setTimeout(() => {
            setAddTransactionFailed(false)
            setAddTransaction(false)
            form.resetFields();
            setEditTransactionFailed(false)
            setEditTransaction(false)
            formEdit.resetFields();
            setIsModalVisible(false)
        }, 3000);
    }

    const getOverAllAmount = () => {
        setLoading(true);

        HTTPClient.Get(`${Endpoints.GET_ALL_BUDGET}/total/${username}/transaction/${month}`)
            .then(data => {
                console.log(data);
                setOverallAmount(data.data.object)
                setLoading(false)


            }).catch(error => {
                console.log(error.msg)
                setLoading(false)

            })
    }



    const columns = [{
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Category",
        accessor: "category"
    },
    {
        Header: "Amount (LKR)",
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
                        onFinish={loadTransactions}
                        initialValues={
                            {
                                "category": selectedCategory,
                                "month": moment(month),
                                "type": selectedType
                            }
                        }
                    >
                        <Form.Item
                            label="Month"
                            name="month"
                            rules={[{ required: true, message: 'Required Field' }]}
                        >
                            <DatePicker onChange={onChange} picker="month" placeholder="Select a month" disabledDate={disabledDate}/>
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
                        <Form.Item
                            label="Transaction Type"
                            name="type"
                            rules={[{ required: true, message: 'Required Field' }]}
                        >

                            <Select placeholder="Transaction type" onChange={(value) => setSelectedType(value)}>
                                <Option value="all">All</Option>
                                <Option value="income">Income</Option>
                                <Option value="expense">Expense</Option>

                            </Select>
                        </Form.Item>

                        <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type="primary" className="go-button" htmlType="submit">
                                Get transactions for the month
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </div>

            {allTransactions && <Row style={{ marginTop: "10px" }}>
                <Col sm={24} md={18} lg={14} xl={14}>
                    <Row style={{ display: "flex", justifyContent: "space-between" }}>

                        <Alert type='success' message={`Total Income LKR ${overallAmount.totalIncome}`} />
                        <Alert type='error' message={`Total Expense LKR ${overallAmount.totalExpenses}`} />

                    </Row>
                    <ReactTable
                        columns={columns}
                        data={allTransactions}
                        defaultPageSize={5}
                        showPageSizeOptions={true}
                        style={{ marginTop: "5px" }}
                        getTrProps={(state, rowInfo, column) => {
                            console.log(rowInfo)
                            return {
                                style: {
                                    background: rowInfo && rowInfo.original && rowInfo.original.type == "income" ? '#f6ffed' : rowInfo && rowInfo.original && rowInfo.original.type == "expense" ? '#fd000030' : ""
                                }
                            }
                        }}
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
                        onFinish={onFinish}
                        style={{ marginTop: "5px" }}

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

                            <Select placeholder="Select a category" >
                                {validArray(allCategories) && allCategories.map((ctgry, index) => {
                                    return (<Option value={ctgry.category_name}>{ctgry.category_name}</Option>)
                                })}
                            </Select>

                        </Form.Item>
                        <Form.Item
                            label="Transaction Type"
                            name="type"
                            rules={[{ required: true, message: 'Required Field' }]}
                        >
                            <Select>

                                <Option value="income">Income</Option>
                                <Option value="expense">Expense</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Amount (LKR)"
                            name="amount"
                            rules={[{ required: true, message: 'Required Field' }, { pattern: /^\d+$/, message: "Invalid format" },{pattern: /^\d+$/, message: "Invalid format"}]}
                        >
                            <Input accept='numeric' />
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
                                <Option value="monthly">Monthly</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type="primary" htmlType="submit" className='go-button'>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    {addTransaction && <Alert type='success' message={addTransaction} />}
                    {addTransactionFailed && <Alert type='error' message={addTransactionFailed} />}
                </Col>
            </Row>}
            <ModalConfirm
                title="Delet Message"
                isModalVisible={isDeletModalVisible}
                handleCancel={handleCancel}
                handleOk={handleDeleteOk}
                body={`Are you sure you want to remove this transaction`}
                deleteSuccess={deleteSuccess}
                deleteFailed={deleteFailed}

            />
            <EditTransaction
                isModalVisible={editModalVsibile}
                handleCancel={handleCancel}
                onFinish={onFinishEdit}
                formEdit={formEdit}
                initialValues={editModalVsibile && allTransactions[selectedIndex]}
                allCategories={allCategories}
                editTransaction={editTransaction}
                editTransactionFailed={editTransactionFailed}
                isTranaction={true}
            />
        </div>
    );
}

export default AllTransactions;
