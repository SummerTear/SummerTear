import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { route, messageType, messageValue } from 'utils';
import { FormattedMessage, injectIntl } from 'preact-intl';
import { registerRequest, registerFormChange } from 'actions';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import Spinner1 from 'components/Spinner1';
import Message from 'components/Message';
import styles from './style';

class RegisterPage extends Component {
  state = { shake: false };
  componentWillMount() {
    if (this.props.loggedIn) {
      route('/', true);
    }
  }
  onRegisterFormChange = e => {
    let state;
    switch (e.target.name) {
      case 'nickname':
        state = {
          ...this.props.formState,
          nickname: e.target.value.trim()
        };
        break;
      case 'username':
        state = {
          ...this.props.formState,
          username: e.target.value.trim()
        };
        break;
      case 'password':
        state = {
          ...this.props.formState,
          password: e.target.value.trim()
        };
        break;
    }
    this.props.registerFormChange(state);
  };
  shakeSubmitButton = () => {
    this.setState({ shake: true });
    setTimeout(() => this.setState({ shake: false }), 500);
  };
  goLoginPage = () => {
    route('/login');
  };
  onSubmit = e => {
    e.preventDefault();
    if (!this.props.formState.nickname) {
      this.nickname.focus();
      this.shakeSubmitButton();
    } else if (!this.props.formState.username) {
      this.username.focus();
      this.shakeSubmitButton();
    } else if (!this.props.formState.password) {
      this.password.focus();
      this.shakeSubmitButton();
    } else {
      this.props.registerRequest({
        nickname: this.props.formState.nickname,
        username: this.props.formState.username,
        password: this.props.formState.password
      });
    }
  };
  render({ formState, error, sending, intl }, { shake }) {
    return (
      <div class={styles.wrap}>
        <form class={styles.form} id="register" onSubmit={this.onSubmit}>
          <Message
            type={messageType(error)}
            message={messageValue(error, intl)}
          />
          <br />
          <div class={styles.fieldWrap}>
            <TextInput
              id="nickname"
              name="nickname"
              placeholder={intl.formatMessage({ id: 'app.nickname' })}
              ref={c => (this.nickname = c)}
              value={formState.nickname}
              onInput={this.onRegisterFormChange}
            />
          </div>
          <div class={styles.fieldWrap}>
            <TextInput
              id="username"
              name="username"
              placeholder={intl.formatMessage({ id: 'app.email' })}
              ref={c => (this.username = c)}
              value={formState.username}
              onInput={this.onRegisterFormChange}
            />
          </div>
          <div class={styles.fieldWrap}>
            <TextInput
              id="password"
              type="password"
              name="password"
              placeholder={intl.formatMessage({ id: 'app.password' })}
              ref={c => (this.password = c)}
              value={formState.password}
              onInput={this.onRegisterFormChange}
            />
          </div>
          <Button
            class={{ [styles.shake]: shake }}
            block
            color="blue"
            type="submit"
          >
            {sending ? (
              <Spinner1 color="white" size="0.6rem" />
            ) : (
              <FormattedMessage id="app.register" />
            )}
          </Button>
          <Button block onClick={this.goLoginPage}>
            <FormattedMessage id="app.login" />
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.register.formState,
    error: state.register.error,
    sending: state.register.sending,
    loggedIn: state.status.loggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerRequest, registerFormChange }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(RegisterPage)
);
