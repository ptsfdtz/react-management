import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import { useSelector } from "react-redux";
import CommonTag from "../components/commonTag";

const { Content } = Layout;

const Main = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // 获取展开收起的状态
  const Collapsed = useSelector((state) => state.tab.isCollapse);
  return (
    <Layout className="main-container">
      <CommonAside collapsed={Collapsed} />
      <Layout>
        <CommonHeader collapsed={Collapsed} />
        <CommonTag />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
