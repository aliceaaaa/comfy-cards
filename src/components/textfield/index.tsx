import { InputHTMLAttributes, ReactNode } from 'react';
import { Field } from '../field';
import styles from './textfield.module.scss';

interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id'
> {
  id: string;
  label: string;
  hint?: ReactNode;
}

export const TextField = ({ id, label, hint, ...rest }: TextFieldProps) => (
  <Field id={id} label={label} hint={hint}>
    <input id={id} className={styles.input} {...rest} />
  </Field>
);
