import { ReactNode } from 'react';
import styles from './panel.module.scss';

interface PanelProps {
  title?: string;
  children: ReactNode;
}

/** Белый блок с рамкой — базовая «карточка» интерфейса. */
export function Panel({ title, children }: PanelProps) {
  return (
    <section className={styles.panel}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {children}
    </section>
  );
}
