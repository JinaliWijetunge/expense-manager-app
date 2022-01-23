import React from "react";
import { Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Layout, Row, Col, Tabs } from "antd";

import history from "../../_helpers/history";

const { Header, Content, Footer } = Layout;

const { TabPane } = Tabs;

function callback(key) {
  console.log(key)
  history.push(`/${key}`);
}

const TabView = () => {
 
  const location = useLocation();
  let activeKey = location.pathname.split("/")
  console.log(activeKey)
  return (
    <div className="site-layout-content">
    
          <Tabs onChange={callback} type="card" activeKey={activeKey[1]} >
            <TabPane tab="Overview" key="" className={window.location.pathname.includes("") ? "ant-tabs-tab-active" : "ant-tabs-tab"}></TabPane>
            <TabPane tab="Transactions" key="transactions" className={window.location.pathname.includes("transactions") ? "ant-tabs-tab-active" : "ant-tabs-tab"}></TabPane>
            <TabPane tab="Budget" key="budget" className={window.location.pathname.includes("budget") ? "ant-tabs-tab-active" : "ant-tabs-tab"}></TabPane>
            <TabPane tab="Categories" key="categories" className={window.location.pathname.includes("categories") ? "ant-tabs-tab-active" : "ant-tabs-tab"}></TabPane>
          </Tabs>
        
    </div>
  );
};

export default TabView;
