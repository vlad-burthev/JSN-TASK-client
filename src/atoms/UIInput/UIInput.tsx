import { forwardRef, type InputHTMLAttributes } from "react";

import styles from "./UIInput.module.css";

interface UIInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const UIInput = forwardRef<HTMLInputElement, UIInputProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <label className={styles.wrapper} htmlFor={id}>
        <span className={styles.label}>{label}</span>
        <input
          ref={ref}
          className={styles["input"]}
          id={id}
          type="text"
          {...props}
        />
      </label>
    );
  }
);

interface UIFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const UIFileInput = forwardRef<HTMLInputElement, UIFileInputProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <label className={styles.wrapper} htmlFor={id}>
        <span className={styles.label}>{label}</span>
        <input
          ref={ref}
          className={styles["input-file"]}
          id={id}
          type="file"
          multiple
          accept="image/png, image/jpeg, image/webp"
          {...props}
        />
      </label>
    );
  }
);
