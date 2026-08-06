import { ReactNode } from 'react';
import styles from './field.module.scss';

interface FieldProps {
  id: string;
  label: string;
  hint?: ReactNode;
  children: ReactNode;
}

/** Обёртка «подпись + контрол + подсказка», общая для всех полей ввода. */
export function Field({ id, label, hint, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {children}
      {hint ? <span className={styles.hint}>{hint}</span> : null}
    </div>
  );
}
