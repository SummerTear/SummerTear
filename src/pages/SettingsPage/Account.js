import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { FormattedMessage, injectIntl } from 'preact-intl';
import {
  settingsAccountRequest,
  settingsAccountFormChange,
  settingsAccountFormInit,
  settingsAccountFormFieldValidate,
  settingsAccountFormFieldValidateStart
} from 'actions';
import { messageType, messageValue } from 'utils';
import Card from 'components/Card';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Dialog from 'components/Dialog';
import Message from 'components/Message';
import userState from 'constants/userState';
import styles from './style';

class Account extends Component {
  state = {
    open: false,
    password: ''
  };

  componentWillMount() {
    this.props.settingsAccountFormInit({
      username: this.props.currentUsername,
      email: this.props.currentEmail
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.sending && this.state.open && this.props.sending) {
      this.close();
    }
  }
  open = () => this.setState({ open: true, password: '' });

  close = () => this.setState({ open: false });

  onPasswordChange = e => this.setState({ password: e.target.value });

  onAccountFormChange = e =>
    this.props.settingsAccountFormChange(e.target.name, e.target.value);

  onDialogSubmit = e => {
    e.preventDefault();
    if (this.state.password) {
      this.props.settingsAccountRequest({
        username: this.props.formState.username.value,
        email: this.props.formState.email.value,
        password: this.state.password
      });
    }
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.open();
  };

  render(
    { formState, canSubmit, message, sending, state, intl },
    { open, password }
  ) {
    const actions = [
      {
        label: '取消',
        shadow: false,
        onClick: this.close
      },
      {
        label: '确认',
        color: 'blue',
        disabled: !password,
        onClick: this.onDialogSubmit
      }
    ];
    return (
      <Card class={styles.card}>
        <form onSubmit={this.onFormSubmit}>
          <div class={styles.cardTitle}>帐号设置</div>
          <div class={styles.cardContent}>
            <Message
              type={messageType(message)}
              message={messageValue(message, intl)}
            />
            <div class={styles.formGroup}>
              <label class={styles.formLabel}>用户状态</label>
              <div class={styles.formControls}>
                <span class={styles[`userState${state}`]}>
                  <FormattedMessage id={`userState${state}`} />
                </span>
              </div>
            </div>
            <div class={styles.formGroup}>
              <label class={styles.formLabel}>用户名</label>
              <div class={styles.formControls}>
                <span class={styles.message}>
                  {messageValue(formState.username.message, intl)}
                </span>
                <TextInput
                  value={formState.username.value}
                  name="username"
                  onInput={this.onAccountFormChange}
                />
                <p class={styles.info}>{`https://summertear.com/${formState
                  .username.value}`}</p>
              </div>
            </div>
            <div class={styles.formGroup}>
              <label class={styles.formLabel}>邮件地址</label>
              <div class={styles.formControls}>
                <span class={styles.message}>
                  {messageValue(formState.email.message, intl)}
                </span>
                <TextInput
                  value={formState.email.value}
                  name="email"
                  onInput={this.onAccountFormChange}
                />
              </div>
            </div>
          </div>
          <div class={styles.cardFooter}>
            <Button
              type="submit"
              disabled={!canSubmit}
              color="blue"
              onClick={this.open}
            >
              保存
            </Button>
          </div>
        </form>
        <Dialog actions={actions} open={open} loading={sending} title="保存帐号更改">
          <form onSubmit={this.onDialogSubmit}>
            <p>请重新输入密码以保存更改到你的账号。</p>
            <TextInput
              type="password"
              placeholder="密码"
              onInput={this.onPasswordChange}
              value={password}
              ref={c => {
                c ? c.focus() : null;
              }}
            />
          </form>
        </Dialog>
      </Card>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentUsername: state.token.obj.username,
    currentEmail: state.token.obj.email,
    state: state.token.obj.state,
    formState: state.settings.account.formState,
    canSubmit: state.settings.account.canSubmit,
    message: state.settings.account.message,
    sending: state.settings.account.sending
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      settingsAccountRequest,
      settingsAccountFormChange,
      settingsAccountFormInit,
      settingsAccountFormFieldValidate,
      settingsAccountFormFieldValidateStart
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(Account)
);
