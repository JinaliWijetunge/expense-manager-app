import React, { useState, useEffect } from "react";

import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./home.css";

import loginicon from "./loginicon.svg";
import Endpoints from "../../services/Endpoints";
import history from "../../_helpers/history";
import HTTPClient from "../../services/HTTPClient";

const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

const Registration = props => {
    const [registrationError, setRegistrationError] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState("");
    const [loading, setLoading] = useState(false)

    const doRegistration = (values) => {
        setLoading(true)
        setRegistrationError("");

        HTTPClient.Post(`${Endpoints.LOGIN}/`, values)
            .then(data => {
                console.log(data);
                setRegistrationSuccess(data.data.msg)
                setLoading(false)
                setTimeout(() => {
                    history.push("/login")
                }, 5000);
                

            }).catch(error => {

                console.log(error.msg)
                setRegistrationError(error.msg)
                setLoading(false)
            })
    }

    return (
        <div className="login-main-container">
            <h3 className="logo-title"> Expense Tracker </h3>
            <div className="form-header">
                <div className="form-icon">
                    <img src={loginicon} alt="login icon"></img>
                </div>
                <h4>Registration</h4>
            </div>
            <div className="login-main-form">
                <Form
                    name="normal_login"
                    className="login-form"
                    // initialValues={{ remember: true }}
                    onFinish={doRegistration}
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Required Field',
                            },
                        ]}

                    >
                        <Input
                            prefix={
                                <UserOutlined
                                    className="site-form-item-icon"
                                    style={{ color: "#646878" }}
                                />
                            }
                            placeholder="Name"
                            onChange={value => {
                                setRegistrationError("");
                            }}
                        />

                    </Form.Item>
                    <Form.Item
                        name="userName"
                        rules={[{
                            required: true,
                            message: 'Required Field',
                        },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined
                                    className="site-form-item-icon"
                                    style={{ color: "#646878" }}
                                />
                            }
                            placeholder="Username"
                            onChange={value => {
                                setRegistrationError("");
                            }}
                        />

                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Required Field',
                        },
                        ]}

                    >
                        <Input
                            prefix={
                                <LockOutlined
                                    className="site-form-item-icon"
                                    style={{ color: "#646878" }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                            onChange={value => {

                                setRegistrationError("");
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[{
                            required: true,
                            message: 'Required Field',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            }
                        })
                        ]}

                    >
                        <Input
                            prefix={
                                <LockOutlined
                                    className="site-form-item-icon"
                                    style={{ color: "#646878" }}
                                />
                            }
                            type="password"
                            placeholder="Confirm Password"
                            onChange={value => {

                                setRegistrationError("");
                            }}
                        />
                    </Form.Item>
                    <div className="remember-me-container">

                        <Form.Item>
                            <a className="login-form-forgot" href="/login">
                                Go back to Login
                            </a>
                        </Form.Item>
                        <Form.Item>
                            <div className="form-button">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"

                                >
                                    <span style={{ paddingRight: '20px' }}>Submit</span>
                                    {loading && (
                                        <Spin indicator={antIcon} />
                                    )}
                                </Button>
                            </div>

                        </Form.Item>
                    </div>
                    {registrationError && <div style={{ marginTop: "10px" }}>
                        <Alert message={registrationError} type="error" />

                    </div>}
                    {registrationSuccess && <div style={{ marginTop: "10px" }}>
                        <Alert message={registrationSuccess} type="success" />

                    </div>}

                </Form>
            </div>
        </div>
    );
};



export default Registration
