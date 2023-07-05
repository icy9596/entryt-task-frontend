import styles from "./index.module.less";

const Index = (): JSX.Element => {
  return (
    <div className={styles["index"]}>
      <span className={styles["placeholder"]}>欢迎进入系统</span>
    </div>
  );
};

export default Index;
