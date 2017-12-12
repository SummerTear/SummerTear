import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { route, messageType, messageValue } from 'utils';
import { FormattedMessage, injectIntl } from 'preact-intl';
import { loginRequest, loginFormChange } from 'actions';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import Spinner1 from 'components/Spinner1';
import Message from 'components/Message';
import styles from './style';

class LoginPage extends Component {
  state = { shake: false, checked: true };
  componentWillMount() {
    if (this.props.loggedIn) {
      route('/', true);
    }
  }
  onLoginFormChange = e => {
    let state;
    switch (e.target.name) {
      case 'username':
        state = {
          ...this.props.formState,
          username: e.target.value
        };
        break;
      case 'password':
        state = {
          ...this.props.formState,
          password: e.target.value
        };
        break;
      case 'remember': {
        let newChecked = !this.state.checked;
        this.setState({ checked: newChecked });
        state = {
          ...this.props.formState,
          remember: newChecked
        };
        break;
      }
    }
    this.props.loginFormChange(state);
  };
  shakeSubmitButton = () => {
    this.setState({ shake: true });
    setTimeout(() => this.setState({ shake: false }), 500);
  };
  goRegisterPage = () => {
    route('/register');
  };
  onSubmit = e => {
    e.preventDefault();
    if (!this.props.formState.username) {
      this.username.focus();
      this.shakeSubmitButton();
    } else if (!this.props.formState.password) {
      this.password.focus();
      this.shakeSubmitButton();
    } else {
      this.props.loginRequest({
        username: this.props.formState.username,
        password: this.props.formState.password,
        remember: this.props.formState.remember
      });
    }
  };
  render({ formState, error, sending, intl }, { shake, checked }) {
    return (
      <div class={styles.wrap}>
        <form class={styles.form} id="login" onSubmit={this.onSubmit}>
          <Message
            type={messageType(error)}
            message={messageValue(error, intl)}
          />
          <br />
          <div class={styles.fieldWrap}>
            <TextInput
              id="username"
              ref={c => (this.username = c)}
              name="username"
              placeholder={intl.formatMessage({ id: 'app.username' })}
              value={formState.username}
              onInput={this.onLoginFormChange}
            />
          </div>
          <div class={styles.fieldWrap}>
            <TextInput
              id="password"
              type="password"
              ref={c => (this.password = c)}
              name="password"
              value={formState.password}
              placeholder={intl.formatMessage({ id: 'app.password' })}
              onInput={this.onLoginFormChange}
            />
          </div>
          <div class={styles.rememberForgot}>
            <label class={styles.remember}>
              <input
                type="checkbox"
                name="remember"
                checked={checked}
                onChange={this.onLoginFormChange}
              />
              <FormattedMessage id="app.remember" />
            </label>
          </div>
          <Button
            class={{ [styles.shake]: shake }}
            color="blue"
            block
            type="submit"
          >
            {sending ? (
              <Spinner1 color="white" size="0.6rem" />
            ) : (
              <FormattedMessage id="app.login" />
            )}
          </Button>
          <Button block onClick={this.goRegisterPage}>
            <FormattedMessage id="app.register" />
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.login.formState,
    error: state.login.error,
    sending: state.login.sending,
    loggedIn: state.status.loggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginRequest, loginFormChange }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(LoginPage)
);
