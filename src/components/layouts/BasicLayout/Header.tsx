import { Layout, Menu, Dropdown, type MenuProps } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useMatches, useNavigate } from "react-router-dom";

import { routes } from "@/router";
import { useStore } from "@/models/system";

import styles from "./basic-layout.module.less";

const { Header: LayoutHeader } = Layout;
const USER_MENU_ACTION = {
  exit: "1",
};

const Header = (): JSX.Element => {
  const pageRoutes = routes[0].children!;
  const items = pageRoutes.map((route) => ({
    key: route.path,
    label: route.title,
  }));

  const matches = useMatches();
  const pageMatched = matches[matches.length - 1];
  const selectedMenu = [pageMatched.pathname];
  const userMenu: MenuProps["items"] = [
    { key: USER_MENU_ACTION.exit, label: "退出", icon: <LogoutOutlined /> },
  ];

  const navigate = useNavigate();
  const { currentUser, logout } = useStore();

  const handleUserMenuClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case USER_MENU_ACTION.exit:
        handleLogout();
        break;
    }
  };
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <LayoutHeader className={styles["header"]}>
      <div className={styles["logo"]}>后台管理系统</div>
      <Menu
        className={styles["nav"]}
        mode="horizontal"
        theme="dark"
        items={items}
        selectedKeys={selectedMenu}
      />
      <div className={styles["user"]}>
        <Dropdown menu={{ items: userMenu, onClick: handleUserMenuClick }}>
          <span className={styles["username"]}>
            <UserOutlined className={styles["user-icon"]} />
            {currentUser ? currentUser.username : "未登录"}
          </span>
        </Dropdown>
      </div>
    </LayoutHeader>
  );
};

export default Header;
