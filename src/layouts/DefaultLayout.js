import React from "react";
import { Layout, Row, Col, Tabs } from "antd";

import NavBar from "../components/navbar";
import TabView from "../components/navbar/TabView";

const { Header, Content, Footer } = Layout;

const DefaultLayout = ViewComponent => {
  return class extends React.Component {
    render() {
      console.log("aksdlaksdjalksdj")
      return (
        <>
          <div className="main-container">
            <NavBar />
            <Row>
              <Col span={24}>
                <Layout className="layout">
                  <Content>
                    <TabView />
                    <ViewComponent />
                  </Content>
                </Layout>
              </Col>
            </Row>
          </div>
        </>
      );
    }
  };
};

export default DefaultLayout;
