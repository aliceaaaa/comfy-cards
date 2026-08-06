import styles from './checkbox.module.scss';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => (
  <label className={styles.checkbox}>
    <input
      type="checkbox"
      className={styles.input}
      checked={checked}
      onChange={(event) => {
        onChange(event.target.checked);
      }}
    />
    {label}
  </label>
);
