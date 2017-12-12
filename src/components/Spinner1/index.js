import { h } from 'preact';
import styles from './style';
// https://github.com/tobiasahlin/SpinKit modify
const Spinner1 = ({ color = 'black', size = '1rem' }) => {
  let style = { backgroundColor: color, width: size, height: size };
  return (
    <div class={styles.spinner}>
      <div class={styles.bounce1} style={style} />
      <div class={styles.bounce2} style={style} />
      <div class={styles.bounce3} style={style} />
    </div>
  );
};

export default Spinner1;
