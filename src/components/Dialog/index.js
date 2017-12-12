import { h, Component } from 'preact';
import Portal from 'preact-portal';
import CSSTransitionGroup from 'preact-css-transition-group';
import Button from 'components/Button';
import Spinner2 from 'components/Spinner2';
import styles from './style';

const FirstChild = ({ children }) => {
  return children[0] || null;
};
class Dialog extends Component {
  render({ open, into = 'body', title, actions, loading, children }) {
    return (
      <Portal into={into}>
        <CSSTransitionGroup
          component={FirstChild}
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enter_active,
            leaveActive: styles.leave_active,
            leave: styles.leave
          }}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {open ? (
            <div class={styles.overlay}>
              <div class={styles.dialog}>
                <section class={styles.body}>
                  {title ? <h6 class={styles.title}>{title}</h6> : null}
                  {children}
                </section>
                <nav class={styles.navigation}>
                  {actions.map(({ label, ...rest }) => (
                    <Button {...rest}>{label}</Button>
                  ))}
                </nav>
                {loading ? (
                  <div class={styles.loading}>
                    <Spinner2 />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </CSSTransitionGroup>
      </Portal>
    );
  }
}

export default Dialog;
