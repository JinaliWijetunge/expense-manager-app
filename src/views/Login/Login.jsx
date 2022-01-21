import React, { useState, useEffect } from "react";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./home.css";

import loginicon from "./loginicon.svg";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
);

const Login = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");


  const validate = () => {
    let isValid = true;
    if (email == null) {
      isValid = false;
      setEmailError("Email is a required field.");
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      isValid = false;
      setEmailError("Email format is invalid.");
    }

    if (password == null) {
      isValid = false;
      setPasswordError("Password is a required field");
    }

    return isValid;
  };

  return (
    <div className="login-main-container">
      <h3 className="logo-title"> Expense Tracker </h3>
      <div className="form-header">
        <div className="form-icon">
          <img src={loginicon} alt="login icon"></img>
        </div>
        <h4>{Login}</h4>
      </div>
      <div className="login-main-form">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        // onFinish={onFinish}
        >
          <Form.Item
            name="username"
          // rules={[{ required: true, message: 'Please input your Username!' }]}
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
                setEmail(value.target.value);
                setEmailError("");
                setLoginError("");
              }}
            />
            <div style={{ height: 20 }}>
              <span style={{ color: "red" }}>{emailError}</span>
            </div>
          </Form.Item>
          <Form.Item
            name="password"
          // rules={[{ required: true, message: 'Please input your Password!' }]}
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
                setPassword(value.target.value);
                setPasswordError("");
                setLoginError("");
              }}
            />
            <div style={{ height: 20 }}>
              <span style={{ color: "red" }}>{passwordError}</span>
            </div>
          </Form.Item>
          <div className="remember-me-container">
            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('loginPage.rememberMe')}</Checkbox>
            </Form.Item> */}
            <Form.Item>
              <a className="login-form-forgot" href="/forgot-password">
                Forgot Password
              </a>
            </Form.Item>
          </div>

          <Form.Item>
            <div className="form-button">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={() => {
                  if (validate()) {
                    setLoginError("");
                    // props.authInstitute(email, password);
                  }
                }}
              >
                <span style={{ paddingRight: '20px' }}>Login</span>
                {props.login && props.login.authInstituteLoading && (
                  <Spin indicator={antIcon} />
                )}
              </Button>
            </div>
            <div style={{ height: 20 }}>
              <span style={{ color: "red" }}>{loginError}</span>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};



export default Login
