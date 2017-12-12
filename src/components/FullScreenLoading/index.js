import { h } from 'preact';
import Portal from 'preact-portal';
import Spinner2 from 'components/Spinner2';
import styles from './style';

const FullScreenLoading = ({ open }) =>
  open ? (
    <Portal into="body">
      <div class={styles.loading}>
        <Spinner2 />
      </div>
    </Portal>
  ) : null;
export default FullScreenLoading;
