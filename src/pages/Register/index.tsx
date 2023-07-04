import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Register = (): JSX.Element => {
  const navigate = useNavigate();

  const handleGotoLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      Register
      <Button type="dashed" onClick={handleGotoLogin}>登录</Button>
    </div>
  );
};

export default Register;
