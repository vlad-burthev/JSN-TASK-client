import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import clsx from "clsx";

import styles from "./UICloseBtn.module.css";

interface UICloseBtnProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const UICloseBtn: FC<UICloseBtnProps> = ({ children, className, ...props }) => {
  return (
    <button className={clsx(styles[`btn`], className)} {...props}>
      {children}
    </button>
  );
};

export default UICloseBtn;
