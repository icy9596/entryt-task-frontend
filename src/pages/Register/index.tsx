import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import styles from "./register.module.less";

const validateUsername = (value: string) => {
  // 字母开头，只允许字母和数字
  const reg = /^([A-Za-z])[A-Za-z0-9]+$/;
  return reg.test(value);
};

const validatePassword = (value: string) => {
  // 只允许大小写字母+数字组合
  const charArr = value.split("");
  const invalidReg = /[^a-zA-Z0-9]/;
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;

  const isUpper = (char: string) => {
    const reg = /^[A-Z]$/;
    return reg.test(char);
  };
  const isLower = (char: string) => {
    const reg = /^[a-z]$/;
    return reg.test(char);
  };
  const isNum = (char: string) => {
    return !Number.isNaN(parseInt(char));
  };
  
  if (invalidReg.test(value)) return false;

  for (let char of charArr) {
    if (!hasUpper && isUpper(char)) {
      hasUpper = true;
    } else if (!hasLower && isLower(char)) {
      hasLower = true;
    } else if (!hasNum && isNum(char)) {
      hasNum = true;
    }
    if (hasUpper && hasLower && hasNum) {
      return true;
    }
  }

  return false;
};

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleRegister = async () => {
    const values = await form.validateFields();
    console.log(values);
  };

  const handleGotoLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles["register"]}>
      <div className={styles["title"]}>注册新用户</div>
      <Form className={styles["form"]} form={form} layout="vertical">
        <Form.Item
          name="username"
          label="用户名"
          validateFirst
          rules={[
            { required: true, message: "用户名不能为空" },
            { min: 8, message: "应大于等于8位" },
            {
              validator: (_, value) => {
                if (!validateUsername(value)) {
                  return Promise.reject(
                    new Error("由字母开头、大小写字母+数字组合")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          validateFirst
          rules={[
            { required: true, message: "密码不能为空" },
            { min: 8, message: "应大于等于8位" },
            {
              validator: (_, value) => {
                if (!validatePassword(value)) {
                  return Promise.reject(
                    new Error("由大小写字母+数字组合")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="确认密码"
          validateFirst
          dependencies={['password']}
          rules={[
            { required: true, message: "确认密码不能为空" },
            {
              validator: (_, value) => {
                if (form.getFieldValue("password") !== value) {
                  return Promise.reject(new Error("密码不一致，请重新输入"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
      </Form>
      <Button
        className={styles["action"]}
        type="primary"
        onClick={handleRegister}
      >
        注册
      </Button>
      <Button
        className={styles["action"]}
        type="dashed"
        onClick={handleGotoLogin}
      >
        登录
      </Button>
    </div>
  );
};

export default Register;
