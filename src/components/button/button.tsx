import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
type ButtonSize = 'md' | 'lg' | 'circle';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const sizeClass: Record<ButtonSize, string> = {
  md: styles.sizeMd,
  lg: styles.sizeLg,
  circle: styles.sizeCircle,
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classNames = [styles.button, styles[variant], sizeClass[size]];

  if (fullWidth) {
    classNames.push(styles.fullWidth);
  }

  if (className) {
    classNames.push(className);
  }

  return <button type={type} className={classNames.join(' ')} {...rest} />;
}
