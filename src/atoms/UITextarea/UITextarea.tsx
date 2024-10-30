import { forwardRef, type FC, type TextareaHTMLAttributes } from "react";

import styles from "./UITextarea.module.css";
import clsx from "clsx";

interface UITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const UITextarea: FC<UITextareaProps> = forwardRef<
  HTMLTextAreaElement,
  UITextareaProps
>(({ label, id, className, ...props }, ref) => {
  return (
    <label className={styles.wrapper} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      <textarea
        ref={ref}
        className={clsx(styles.textarea, className)}
        id={id}
        {...props}
      />
    </label>
  );
});
