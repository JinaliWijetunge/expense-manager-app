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

const Login = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false)


  const validate = () => {
    let isValid = true;
    if (email == null) {
      isValid = false;
      setEmailError("Username is a required field.");
    }
    if (password == null) {
      isValid = false;
      setPasswordError("Password is a required field");
    }

    return isValid;
  };

  const doLogin = () => {
    setLoading(true)
    setLoginError("");

    HTTPClient.Get(`${Endpoints.LOGIN}/${email}/${password}`)
      .then(data => {
        console.log(data);
        setLoading(false)
        history.push("/")

      }).catch(error => {

        console.log(error.msg)
        setLoginError(error.msg)
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
        <h4>Login</h4>
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
            <div style={{ marginTop: 20 }}>
              <span style={{ color: "red" }}>{passwordError}</span>
            </div>
          </Form.Item>
          <div className="remember-me-container">

            <Form.Item>
              <a className="login-form-forgot" href="/registration">
                New User? Create an Account
              </a>
            </Form.Item>
            <Form.Item>
              <div className="form-button">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={() => {
                    if (validate()) {
                      doLogin();

                    }
                  }}
                >
                  <span style={{ paddingRight: '20px' }}>Login</span>
                  {loading && (
                    <Spin indicator={antIcon} />
                  )}
                </Button>
              </div>
              {loginError && <div style={{ marginTop: "20px" }}>
                <Alert message={loginError} type="error" />

              </div>}
            </Form.Item>
          </div>

        </Form>
      </div>
    </div>
  );
};



export default Login
