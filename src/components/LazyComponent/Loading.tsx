import { Spin } from "antd";

const Loading = (): JSX.Element => {
  return (
    <div>
      <span>页面加载中...</span>
      <Spin />
    </div>
  );
};

export default Loading;
