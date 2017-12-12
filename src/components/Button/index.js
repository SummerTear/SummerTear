import { h, Component } from 'preact';
import cx from 'classnames';
import Spinner1 from 'components/Spinner1';
import styles from './style';

class Button extends Component {
  render({
    children,
    className,
    color,
    block,
    loading,
    type = 'button',
    shadow = true,
    ...rest
  }) {
    const buttonClass = cx(
      {
        [styles.button]: true,
        [styles.block]: block,
        [styles.blue]: color === 'blue',
        [styles.pink]: color === 'pink',
        [styles.yellow]: color === 'yellow',
        [styles.shadow]: shadow
      },
      className ? className : rest.class
    );
    return (
      <button {...rest} class={buttonClass} type={type}>
        {loading ? <Spinner1 color="white" size="0.6rem" /> : children}
      </button>
    );
  }
}

export default Button;
