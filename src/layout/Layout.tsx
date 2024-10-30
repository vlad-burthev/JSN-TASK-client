import type { FC } from "react";
import { Outlet } from "react-router-dom";

import styles from "./Layout.module.css";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
};

export default Layout;
