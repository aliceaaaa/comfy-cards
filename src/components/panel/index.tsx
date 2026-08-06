import { ReactNode } from 'react';
import styles from './panel.module.scss';

interface PanelProps {
  title?: string;
  children: ReactNode;
}

export const Panel = ({ title, children }: PanelProps) => (
  <section className={styles.panel}>
    {title ? <h2 className={styles.title}>{title}</h2> : null}
    {children}
  </section>
);
