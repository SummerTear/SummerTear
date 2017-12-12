import { h } from 'preact';
import styles from './style';

const types = {
  success: styles.success,
  warning: styles.warning,
  info: styles.info,
  error: styles.error
};

const Message = ({ type = 'info', message }) => {
  if (message) {
    return (
      <div class={types[type]}>
        <p>{message}</p>
      </div>
    );
  }
  return <div />;
};

export default Message;
