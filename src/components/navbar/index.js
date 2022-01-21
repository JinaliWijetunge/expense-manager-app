import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useRouteMatch, Link } from "react-router-dom";
import { Row, Col, Button, Dropdown, Menu, message } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import { LoadingOutlined, CaretDownOutlined } from '@ant-design/icons';
import history from "../../_helpers/history";

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#000' }} spin />;

const Form = props => {
  const { path, url } = useRouteMatch();
  const [loading, setLoading] = useState(false)

  function handleMenuClick(e) {
    if (e.key === "1") {
      props.history.push(`/citizen-details`);
    }
    if (e.key === "2") {
      props.resetGraphData()
      props.history.push(`/`);
    }
    if (e.key === "3") {
      props.history.push(`/password-reset`);
    }
    if (e.key === "5") {
      props.history.push(`/alerts`);
    }
    if (e.key === "6") {
      props.history.push(`/merge-profiles`);
    }
  }

  const handleTimeout = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.localStorage.clear();
      history.push(`${process.env.PUBLIC_URL}/login`);
    }, 1000);
  }
  const menu = (
    <Menu onClick={handleMenuClick} >
      
      <Menu.Item key="4" onClick={() => handleTimeout()}>
       Logout
      </Menu.Item>

    </Menu>
  );

  return (
    <>
      <Row>
        <Col span={24}>
          <div className="navbar-container">
            <div className="home-container">
              <Link to={`/dashboard`}><HomeFilled style={{ fontSize: '24px', color: '#00abc5' }} /></Link>
              <h3>Expense Tracker</h3>
            </div>
            <Dropdown overlay={menu}>
              <Button>
               Name <CaretDownOutlined />
              </Button>
            </Dropdown>

          </div>
        </Col>
      </Row>
    </>
  );
};



export default Form
