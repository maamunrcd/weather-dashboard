import React from "react";
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader: React.FC = () => (
  <Header>
    <Title level={3}>Weather Dashboard</Title>
  </Header>
);

export default AppHeader;
