import { h } from 'preact';
import cx from 'classnames';
import styles from './style';

const Card = ({ className, children, ...rest }) => {
  const cardClass = cx(
    {
      [styles.card]: true
    },
    className ? className : rest.class
  );
  return (
    <div {...rest} class={cardClass}>
      {children}
    </div>
  );
};

export default Card;
