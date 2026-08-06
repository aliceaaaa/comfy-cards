import { ReactNode, TextareaHTMLAttributes } from 'react';
import { Field } from '../field';
import styles from './textarea.module.scss';

interface TextAreaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'id'
> {
  id: string;
  label: string;
  hint?: ReactNode;
}

export const TextArea = ({ id, label, hint, ...rest }: TextAreaProps) => (
  <Field id={id} label={label} hint={hint}>
    <textarea id={id} className={styles.textarea} {...rest} />
  </Field>
);
