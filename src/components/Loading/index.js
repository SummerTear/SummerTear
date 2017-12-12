import { h } from 'preact';
import styles from './style';

const Loading = () => (
  <div class={styles.loading}>
    <div class={styles.spinner} />
  </div>
);

export default Loading;
