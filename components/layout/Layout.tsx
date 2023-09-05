"use client";

import { Children } from "../../src/types/children";
import Nav from "../nav/Nav";
import styles from "./Layout.module.css";

interface Props extends Children {
  backButton?: boolean;
}

const Layout = ({ children, backButton }: Props) => {
  return (
    <div className={styles.content}>
      <Nav backButton={backButton} />
      {children}
    </div>
  );
};

export default Layout;
