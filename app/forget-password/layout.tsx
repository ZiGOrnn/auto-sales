import { Children } from "../../src/types/children";
import styles from "./login.module.css";

const Layout = ({ children }: Children) => {
  return <div className={styles.content}>{children}</div>;
};

export default Layout;
