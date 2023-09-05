import { Children } from "../../src/types/children";
import styles from "./Content.module.css";

interface Props extends Children {}

const Content = ({ children }: Props) => {
  return <div className={styles.content}>{children}</div>;
};

export default Content;
