import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import Header from './Header';

import styles from "./basic-layout.module.less";

const { Content } = Layout;

const BasicLayout = (): JSX.Element => {
  return (
    <div className={styles["basic-layout"]}>
      <Header />
      <Content className={styles['content']}>
        <Outlet />
      </Content>
    </div>
  );
};

export default BasicLayout;
