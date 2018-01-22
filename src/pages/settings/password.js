import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { FormattedMessage, injectIntl } from 'preact-intl';
import { connect } from 'preact-redux';
import {
  settingsPasswordRequest,
  settingsPasswordFormChange,
  settingsPasswordFormInit
} from 'actions';
import { messageType, messageValue } from 'utils';
import Card from 'components/Card';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Message from 'components/Message';
import FullScreenLoading from 'components/FullScreenLoading';
import styles from './style';

class Password extends Component {
  componentWillMount() {
    this.props.settingsPasswordFormInit();
  }
  onPasswordFormChange = e =>
    this.props.settingsPasswordFormChange(e.target.name, e.target.value);
  onSubmit = e => {
    e.preventDefault();
    this.props.settingsPasswordRequest({
      current: this.props.formState.current.value,
      password: this.props.formState.password.value
    });
  };

  render({ formState, message, canSubmit, sending, intl }) {
    return (
      <Card class={styles.card}>
        <form onSubmit={this.onSubmit}>
          <div class={styles.cardTitle}>密码设置</div>
          <div class={styles.cardContent}>
            <Message
              type={messageType(message)}
              message={messageValue(message, intl)}
            />
            <div class={styles.formGroup}>
              <label class={styles.formLabel}>当前密码</label>
              <TextInput
                class={styles.formControls}
                value={formState.current.value}
                onInput={this.onPasswordFormChange}
                name="current"
                type="password"
              />
            </div>
            <div class={styles.formGroup}>
              <label class={styles.formLabel}>新密码</label>
              <div class={styles.formControls}>
                <span class={styles.message}>
                  {messageValue(formState.password.message, intl)}
                </span>
                <TextInput
                  value={formState.password.value}
                  onInput={this.onPasswordFormChange}
                  name="password"
                  type="password"
                />
              </div>
            </div>
            <div class={styles.formGroup}>
              <label class={styles.formLabel}>确认密码</label>
              <div class={styles.formControls}>
                <span class={styles.message}>
                  {messageValue(formState.confirm.message, intl)}
                </span>
                <TextInput
                  value={formState.confirm.value}
                  onInput={this.onPasswordFormChange}
                  name="confirm"
                  type="password"
                />
              </div>
            </div>
          </div>
          <div class={styles.cardFooter}>
            <Button
              type="submit"
              color="blue"
              disabled={!canSubmit}
              onClick={this.open}
            >
              保存
            </Button>
          </div>
        </form>
        <FullScreenLoading open={sending} />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    formState: state.settings.password.formState,
    canSubmit: state.settings.password.canSubmit,
    message: state.settings.password.message,
    sending: state.settings.password.sending
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      settingsPasswordRequest,
      settingsPasswordFormChange,
      settingsPasswordFormInit
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(Password)
);
