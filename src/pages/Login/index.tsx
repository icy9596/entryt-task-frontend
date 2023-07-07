import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { useStore as useLoginStore } from '@/store/login';

import styles from "./login.module.less";

const Login = (): JSX.Element => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useLoginStore();

  const handleLogin = async () => {
    const value = await form.validateFields();
    login(value);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["title"]}>登录</div>
      <Form className={styles["form"]} form={form} layout="vertical">
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: "用户名不能为空" }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "密码不能为空" }]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
      </Form>
      <Button className={styles["action"]} type="primary" onClick={handleLogin}>
        登录
      </Button>
      <Button
        className={styles["action"]}
        type="dashed"
        onClick={handleRegister}
      >
        注册
      </Button>
    </div>
  );
};

export default Login;
